import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Bidders } from '../../api/bidders';
import { Bids } from '../../api/bids';

export const useBidderInformation = (emailAddress) => useTracker(() =>
// Meteor.subscribe('bidders.get', emailAddress);

  // return Bidders.findOne({ emailAddress });
  Meteor.user());

export const useCurrentBid = (itemId) => useTracker(() => {
  if (itemId == null) return null;

  Meteor.subscribe('bids.current', itemId);

  return Bids.findOne({ itemId });
});
