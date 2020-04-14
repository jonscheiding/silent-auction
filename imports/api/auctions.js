import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Auctions = new Mongo.Collection('auctions');

if (Meteor.isServer) {
  Meteor.publish('auctions', () => Auctions.find({}));

  Meteor.startup(() => {
    if (Auctions.findOne({})) {
      return;
    }

    Auctions.insert({
      currentItemId: null,
      isLive: false,
    });
  });
}
