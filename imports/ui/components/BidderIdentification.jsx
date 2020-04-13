import React from 'react';
import Button from 'react-bootstrap/Button';

import { useLocalBidderEmail } from '../hooks/localStorage';

export const BidderIdentification = () => {
  const [email, , clearEmail] = useLocalBidderEmail();

  return (
    <h6>
      Bidding as {email} <br />
      <Button variant="link" size="xs" onClick={clearEmail}>Change</Button>
    </h6>
  );
};
