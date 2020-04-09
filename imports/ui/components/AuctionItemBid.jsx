import React from 'react';

import { useLocalBidderEmail } from '../hooks/localStorage';
import { useBidderInformation } from '../hooks/meteor';
import { BidderLogin } from './BidderLogin';
import { BidControls } from './BidControls';

export const AuctionItemBid = ({ auctionItem, currentBid }) => {
  const [bidderEmail, setBidderEmail] = useLocalBidderEmail();

  const bidder = useBidderInformation(bidderEmail);

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
