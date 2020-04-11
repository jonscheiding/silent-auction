import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import itemContent from './items.json';

export const Items = new Mongo.Collection('items', {
  transform: (item) => {
    const content = itemContent.find((i) => i.reference === item.reference);

    const sortedBids = [...item.bids].sort((a, b) => b.amount - a.amount);
    const currentBid = sortedBids[0] || { amount: 0 };

    return {
      ...item,
      content,
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

    if (!item) {
      throw new Meteor.Error(`Item '${itemId}' does not exist.`);
    }

    if (item.currentBid.bidderId === bidderId) {
      throw new Meteor.Error(`Bidder '${bidderId}' is already the current bidder on item '${itemId}'.`);
    }

    if (item.currentBid.amount >= amount) {
      throw new Meteor.Error(`The current bid of ${item.currentBid.amount} on item '${itemId}' is higher than ${amount}.`);
    }

    Items.update({ _id: item._id }, {
      $push: { bids: { bidderId, amount } },
    });
  },
});

if (Meteor.isServer) {
  Meteor.publish('items', () => Items.find({}));

  Meteor.startup(() => {
    for (const item of itemContent) {
      Items.upsert(
        { reference: item.reference },
        {
          $setOnInsert: {
            reference: item.reference,
          },
        },
      );
    }
  });
}
