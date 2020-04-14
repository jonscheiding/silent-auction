import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

import content from '/content.json';
import { Bidders } from './bidders';

export const Items = new Mongo.Collection('items', {
  transform: (item) => {
    const itemContent = content.items.find((i) => i.reference === item.reference);

    const sortedBids = [...item.bids].sort((a, b) => b.amount - a.amount);
    const currentBid = sortedBids[0] || { amount: 0 };

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

    if (!item) {
      throw new Meteor.Error(`Item '${itemId}' does not exist.`);
    }

    if (!bidder) {
      throw new Meteor.Error(`Bidder '${bidderId}' does not exist.`);
    }

    if (item.currentBid.bidderId === bidderId) {
      throw new Meteor.Error(`Bidder '${bidderId}' is already the current bidder on item '${itemId}'.`);
    }

    if (item.currentBid.amount >= amount) {
      throw new Meteor.Error(`The current bid of ${item.currentBid.amount} on item '${itemId}' is higher than ${amount}.`);
    }

    const previousBidderId = item.currentBid.bidderId;

    Items.update({ _id: item._id }, {
      $push: { bids: { bidderId, amount } },
    });

    if (Meteor.isServer) {
      Email.sendWithTemplate({
        templateName: 'BidEmail',
        to: bidder.emailAddress,
        data: {
          itemTitle: item.content.title,
        },
      });

      const previousBidder = Bidders.findOne({ _id: previousBidderId });
      if (!previousBidder) {
        return;
      }

      Email.sendWithTemplate({
        templateName: 'OutbidEmail',
        to: previousBidder.emailAddress,
        data: {
          itemId: item._id,
          itemTitle: item.content.title,
        },
      });
    }
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
