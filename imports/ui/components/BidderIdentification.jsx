import React from 'react';
import Button from 'react-bootstrap/Button';

import { useLocalBidderInformation } from '../hooks/meteor';
import { useLocalBidderEmail } from '../hooks/localStorage';
import { BidderLogin } from './BidderLogin';

export const BidderIdentification = () => {
  const bidder = useLocalBidderInformation();
  const [, , clearEmail] = useLocalBidderEmail();

  if (bidder._id == null) {
    return <BidderLogin />;
  }

  return (
    <h6>
      Bidding as {bidder.emailAddress} <br />
      <Button variant="link" size="xs" onClick={() => clearEmail()}>Change</Button>
    </h6>
  );
};
