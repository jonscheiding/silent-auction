import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import Emails from './emails';

export const Bidders = new Mongo.Collection('bidders');

if (Meteor.isServer) {
  Meteor.publish('bidders.get', (emailAddress) => {
    check(emailAddress, Match.Maybe(String));
    return Bidders.find({ emailAddress });
  });
}

Meteor.methods({
  'bidders.login'(emailAddress) {
    check(emailAddress, String);

    const existingBidder = Bidders.findOne({ emailAddress });

    if (existingBidder) {
      return;
    }

    const validationCode = Random.hexString(16);
    const bidder = {
      emailAddress,
      validationCode,
      isValidated: false,
    };

    Bidders.insert(bidder);

    Emails.validate(bidder);
  },

  'bidders.validate'(validationCode) {
    check(validationCode, String);

    Bidders.update(
      { validationCode },
      {
        $set: { isValidated: true },
      },
    );
  },

  'bidders.resendValidation'(bidderId) {
    check(bidderId, String);

    if (!Meteor.isServer) {
      return;
    }

    const bidder = Bidders.findOne({ _id: bidderId });

    Emails.validate(bidder);

    Bidders.update(
      { _id: bidderId },
      { $set: { validationResendCount: (bidder.validationResendCount || 0) + 1 } },
    );
  },
});
