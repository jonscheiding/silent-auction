import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Bidders } from '../../api/bidders';
import { Bids } from '../../api/bids';
import { Items } from '../../api/items';

export const useBidderInformation = (emailAddress) => useTracker(() => {
  Meteor.subscribe('bidders.get', emailAddress);

  return Bidders.findOne({ emailAddress });
});

export const useCurrentBid = (itemId) => useTracker(() => {
  if (itemId == null) return null;

  Meteor.subscribe('bids.current', itemId);

  return Bids.findOne({ itemId });
});

export const useItems = () => useTracker(() => {
  Meteor.subscribe('items');
  return Items.find({}).fetch();
});
