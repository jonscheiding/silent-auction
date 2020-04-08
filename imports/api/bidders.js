import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Bidders = new Mongo.Collection('bidders');

if (Meteor.isServer) {
  Meteor.publish('bidders.get', function biddersGet(emailAddress) {
    check(emailAddress, String);
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

    Bidders.insert({ emailAddress, isValidated: false });
  },
});
