import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';

import { useBidderEmail } from './bidderEmail';
import { Bidders } from '../api/bidders';
import { BidderLogin } from './BidderLogin';
import { BidControls } from './BidControls';

export const AuctionItemBid = ({auctionItem}) => {
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
          ? <BidControls auctionItem={auctionItem} />
          : <p>Awaiting validation.</p>
      }
    </>
  )
};
