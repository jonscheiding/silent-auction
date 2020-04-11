import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Bidders } from '../../api/bidders';
import { Items } from '../../api/items';

export const useBidderInformation = (emailAddress) => useTracker(() => {
  Meteor.subscribe('bidders.get', emailAddress);

  return Bidders.findOne({ emailAddress });
});

export const useItems = () => useTracker(() => {
  Meteor.subscribe('items');
  return Items.find({}).fetch().map((item) => ({
    content: item.content,
    _id: item._id,
  }));
});

export const useItem = (id) => useTracker(() => {
  Meteor.subscribe('items');

  return Items.findOne({ _id: id });
});
