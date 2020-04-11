import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useLocalBidderEmail } from '../hooks/localStorage';

export const BidderLogin = () => {
  const [bidderEmail, setBidderEmail] = useLocalBidderEmail();
  const [enteredEmail, setEnteredEmail] = useState(bidderEmail);

  const handleEmailChange = (e) => setEnteredEmail(e.target.value);

  const handleEmailSubmit = (e) => {
    Meteor.call('bidders.login', enteredEmail);

    setBidderEmail(enteredEmail);
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleEmailSubmit}>
      <Form.Group>
        <Form.Control
          type="email"
          value={enteredEmail || ''}
          onChange={handleEmailChange}
          placeholder="Email address"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
