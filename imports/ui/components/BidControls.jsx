import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const BidControls = ({ auctionItem, currentBidder, currentBid }) => {
  const [enteredAmount, setEnteredAmount] = useState(currentBid.amount + 10);

  useEffect(() => setEnteredAmount(currentBid.amount + 10), [currentBid]);

  const handleEnteredAmountChange = (e) => setEnteredAmount(e.target.value);

  const handleBidSubmit = (e) => {
    Meteor.call('bids.bid',
      auctionItem.id,
      currentBidder._id,
      Number(enteredAmount));

    e.preventDefault();
  };

  if (currentBidder._id === currentBid.bidderId) {
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
