import { useEffect, useState } from 'react';

import { useLocalBidderInformation, useItem } from './meteor';

export const useHighBidderMonitor = (itemId, fn) => {
  const bidder = useLocalBidderInformation();
  const item = useItem(itemId);
  const [wasHighBidder, setWasHighBidder] = useState(null);

  useEffect(() => {
    if (!bidder) {
      setWasHighBidder(null);
    } else {
      setWasHighBidder(item.currentBid.bidderId === bidder._id);
    }
  }, [bidder]);

  useEffect(() => {
    if (!bidder) { return; }

    const isHighBidder = item.currentBid.bidderId === bidder._id;

    if (isHighBidder && wasHighBidder === false) {
      fn({ gained: true });
    } else if (!isHighBidder && wasHighBidder === true) {
      fn({ lost: true });
    }

    setWasHighBidder(isHighBidder);
  }, [item.currentBid]);

  const previouslyWasHighBidder = bidder
    && !wasHighBidder
    && item.bids.find((b) => b.bidderId === bidder._id) != null;

  return {
    current: wasHighBidder,
    previous: !wasHighBidder && previouslyWasHighBidder,
  };
};
