import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const BidderLogin = ({ bidderEmail, setBidderEmail }) => {
  const [enteredEmail, setEnteredEmail] = useState(bidderEmail);

  const handleEmailChange = (e) => setEnteredEmail(e.target.value);

  const handleEmailSubmit = (e) => {
    Meteor.call('users.login', enteredEmail);

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
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
