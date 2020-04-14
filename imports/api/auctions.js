import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Auctions = new Mongo.Collection('auctions');

if (Meteor.isServer) {
  Meteor.publish('auctions', () => Auctions.find({}));
}
