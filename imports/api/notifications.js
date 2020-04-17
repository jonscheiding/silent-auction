import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Notifications = new Mongo.Collection('notifications');


if (Meteor.isServer) {
  Meteor.publish('notifications', function(bidderId, itemId) {
    check(bidderId, Match.Maybe(String));
    check(itemId, Match.Maybe(String));
    return Notifications.find({ bidderId, itemId });
  });
}
