import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { useEffect } from 'react';
import { Bidders } from '../../api/bidders';
import { Items } from '../../api/items';
import { Auctions } from '../../api/auctions';
import { useLocalBidderEmail } from './localStorage';
import { Notifications } from '../../api/notifications';

export const useCurrentAuction = () => useTracker(() => Auctions.findOne({}) || {});

export const useBidderInformation = (emailAddress) => useTracker(() => {
  if (Meteor.isClient) {
    Meteor.subscribe('bidders.get', emailAddress);
  }

  return Bidders.findOne({ emailAddress });
});

export const useLocalBidderInformation = () => {
  const [emailAddress] = useLocalBidderEmail();
  return useBidderInformation(emailAddress) || { emailAddress };
};

export const useItems = () => useTracker(() => Items.find({}).fetch()
  .filter((item) => item.content != null));

export const useItem = (id) => useTracker(() => Items.findOne({ _id: id }));

export const useBidNotifications = (bidderId, itemId, fn) => {
  if (Meteor.isServer) { return; }

  useEffect(() => {
    const subscription = Meteor.subscribe('notifications', bidderId, itemId);
    const observer = Notifications.find({ bidderId, itemId }).observeChanges({
      added: (id, fields) => {
        if (!subscription.ready()) { return; }
        fn({ ...fields, _id: id });
      },
    });

    return () => {
      observer.stop();
      subscription.stop();
    };
  }, [bidderId]);
};
