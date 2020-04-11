import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const BidControls = ({ item, bidder }) => {
  const [enteredAmount, setEnteredAmount] = useState(item.currentBid.amount + 10);

  useEffect(() => setEnteredAmount(item.currentBid.amount + 10), [item.currentBid.amount]);

  const handleEnteredAmountChange = (e) => setEnteredAmount(e.target.value);

  const handleBidSubmit = (e) => {
    Meteor.call('items.bid',
      item._id,
      bidder._id,
      Number(enteredAmount));

    e.preventDefault();
  };

  if (bidder._id === item.currentBid.bidderId) {
    return (<p>You are the current high bidder!</p>);
  }

  return (
    <Form onSubmit={handleBidSubmit}>
      <Form.Group>
        <Form.Label>Your Bid</Form.Label>
        <Form.Control
          type="number"
          value={enteredAmount}
          onChange={handleEnteredAmountChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Bid
      </Button>
    </Form>
  );
};
