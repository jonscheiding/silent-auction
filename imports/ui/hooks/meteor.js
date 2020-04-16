import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Bidders } from '../../api/bidders';
import { Items } from '../../api/items';
import { Auctions } from '../../api/auctions';
import { useLocalBidderEmail } from './localStorage';

export const useCurrentAuction = () => useTracker(() => {
  Meteor.subscribe('auctions');

  return Auctions.findOne({}) || {};
});

export const useBidderInformation = (emailAddress) => useTracker(() => {
  Meteor.subscribe('bidders.get', emailAddress);

  return Bidders.findOne({ emailAddress });
});

export const useLocalBidderInformation = () => {
  const [emailAddress] = useLocalBidderEmail();
  return useBidderInformation(emailAddress) || { emailAddress };
};

export const useItems = () => useTracker(() => {
  Meteor.subscribe('items');

  return Items.find({}).fetch()
    .filter((item) => item.content != null);
});

export const useItem = (id) => useTracker(() => {
  Meteor.subscribe('items');

  return Items.findOne({ _id: id });
});
