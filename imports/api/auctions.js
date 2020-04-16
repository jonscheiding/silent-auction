import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import content from '/content.json';

export const Auctions = new Mongo.Collection('auctions', {
  transform: (auction) => ({
    ...auction,
    content: content.auction,
  }),
});

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
