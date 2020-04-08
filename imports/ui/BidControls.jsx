import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const BidControls = ({auctionItem}) => {
  const [enteredAmount, setEnteredAmount] = useState(auctionItem.bid + 10);

  const handleEnteredAmountChange = (e) => 
    setEnteredAmount(e.target.value);

  const handleBidClick = () => {};

  return (
    <Form>
      <Form.Group>
        <Form.Label>Your Bid</Form.Label>
        <Form.Control type="number" 
          value={enteredAmount} onChange={handleEnteredAmountChange} />
      </Form.Group>
      <Button variant="primary" onClick={handleBidClick} type="submit">
        Bid
      </Button>
    </Form>
  );
};