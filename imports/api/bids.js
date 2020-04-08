import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Bidders } from './bidders';

export const Bids = new Mongo.Collection('bids');

if (Meteor.isServer) {
  Meteor.publish('bids.current', function bidsCurrent(itemId) {
    check(itemId, String);

    return Bids.find(
      { itemId },
      {
        sort: { amount: -1 },
        limit: 1,
      },
    );
  });
}

Meteor.methods({
  'bids.bid'(itemId, bidderId, amount) {
    check(itemId, String);
    check(bidderId, String);
    check(amount, Number);

    const existingBidder = Bidders.findOne({ _id: bidderId });

    if (!existingBidder) {
      throw new Meteor.Error('bidderId:not-found');
    }

    if (!existingBidder.isValidated) {
      throw new Meteor.Error('bidderId:not-validated');
    }

    //
    // TODO: Check amount?
    //

    Bids.insert({ itemId, bidderId, amount });
  },
});
