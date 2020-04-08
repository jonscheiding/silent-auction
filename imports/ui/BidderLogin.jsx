import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const BidderLogin = ({bidderEmail, setBidderEmail}) => {
  const [enteredEmail, setEnteredEmail] = useState(bidderEmail);

  const handleEmailChange = (e) => setEnteredEmail(e.target.value);
  
  const handleValidateClick = (e) => {
    Meteor.call('bidders.login', enteredEmail);

    setBidderEmail(enteredEmail);
    e.preventDefault();
  }

  return (
    <Form>
      <Form.Group>
        <Form.Control type="email" 
          value={enteredEmail} onChange={handleEmailChange}
          placeholder="Email address" />
      </Form.Group>
      <Button variant="primary" onClick={handleValidateClick} type="submit">
        Submit
      </Button>
    </Form>
  );
};
