import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import content from '/content.json';
import { Auctions } from './auctions';
import { Bidders } from './bidders';
import { Notifications } from './notifications';
import { bidderStatus } from '../util';

export const Items = new Mongo.Collection('items', {
  transform: (item) => {
    const itemContent = content.items.find((i) => i.reference === item.reference);

    const currentBid = item.bids[0] || { amount: 0 };

    return {
      ...item,
      content: itemContent,
      currentBid,
    };
  },
});

Meteor.methods({
  'items.bid'(itemId, bidderId, amount) {
    check(itemId, String);
    check(bidderId, String);
    check(amount, Number);

    const item = Items.findOne({ _id: itemId });
    const bidder = Bidders.findOne({ _id: bidderId });
    const auction = Auctions.findOne({});

    if (!item) {
      throw new Meteor.Error(`Item '${itemId}' does not exist.`);
    }

    if (!bidder) {
      throw new Meteor.Error(`Bidder '${bidderId}' does not exist.`);
    }

    const status = bidderStatus(item, bidder, auction);

    if (!status.canBid) {
      throw new Meteor.Error(`Bidder '${bidderId}' cannot bid on item '${itemId}': ${status.cannotBidReason}`);
    }

    if (item.currentBid.amount >= amount) {
      throw new Meteor.Error(`The current bid of ${item.currentBid.amount} on item '${itemId}' is higher than ${amount}.`);
    }

    const previousBid = item.currentBid;

    Items.update({ _id: item._id }, {
      $push: {
        bids: {
          $each: [{ bidderId, amount, date: new Date() }],
          $position: 0,
        },
      },
    });

    Notifications.insert({
      type: 'bid',
      bidderId,
      itemId: item._id,
      date: new Date(),
    });

    const previousBidder = Bidders.findOne({ _id: previousBid.bidderId });
    if (!previousBidder) {
      return;
    }

    Notifications.insert({
      type: 'outbid',
      bidderId: previousBid.bidderId,
      itemId: item._id,
      date: new Date(),
    });
  },
});

if (Meteor.isServer) {
  Meteor.publish('items', () => Items.find({}));

  Meteor.startup(() => {
    for (const item of content.items) {
      Items.upsert(
        { reference: item.reference },
        {
          $setOnInsert: {
            reference: item.reference,
            bids: [],
            closed: false,
          },
        },
      );
    }
  });
}
