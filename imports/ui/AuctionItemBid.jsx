import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';

import { useBidderEmail } from './bidderEmail';
import { BidderLogin } from './BidderLogin';
import { Bidders } from '../api/bidders';

export default AuctionItemBid = ({auctionItem}) => {
  const [bidderEmail, setBidderEmail] = useBidderEmail();

  let bidder = useTracker(() => {
    Meteor.subscribe('bidders.get', bidderEmail);

    return Bidders.findOne({emailAddress: bidderEmail});
  });

  if(!bidderEmail || !bidder) {
    return <BidderLogin bidderEmail={bidderEmail} setBidderEmail={setBidderEmail} />
  }

  return (
    <>
      <p>Bidding as {bidderEmail}.</p>
      {
        bidder.isValidated
          ? <p>Good to go!</p>
          : <p>Not validated yet.</p>
      }
    </>
  )
};
