import { useEffect, useState } from 'react';

import { useLocalBidderInformation } from './meteor';

export const useHighBidderMonitor = (item, fn) => {
  const bidder = useLocalBidderInformation();
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
};
