import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';

import { useLocalBidderEmail } from '../hooks/localStorage';
import { Bidders } from '../../api/bidders';
import { BidderLogin } from './BidderLogin';
import { BidControls } from './BidControls';

export const AuctionItemBid = ({ auctionItem, currentBid }) => {
  const [bidderEmail, setBidderEmail] = useLocalBidderEmail();

  const bidder = useTracker(() => {
    Meteor.subscribe('bidders.get', bidderEmail);

    return Bidders.findOne({ emailAddress: bidderEmail });
  });

  if (!bidderEmail || !bidder) {
    return <BidderLogin bidderEmail={bidderEmail} setBidderEmail={setBidderEmail} />;
  }

  return (
    <>
      <p>
        Bidding as {bidderEmail}.
      </p>
      {
        bidder.isValidated
          ? <BidControls auctionItem={auctionItem} currentBidder={bidder} currentBid={currentBid} />
          : <p>Awaiting validation.</p>
      }
    </>
  );
};
