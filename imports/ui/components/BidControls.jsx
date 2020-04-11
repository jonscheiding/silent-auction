import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { formatCurrency } from '../../util';
import { useLocalBidderInformation } from '../hooks/meteor';
import { BidEntry } from './BidEntry';
import { BidderLogin } from './BidderLogin';

export const BidControls = ({ currentBid, itemId }) => {
  const initialAmount = currentBid.amount + 10;
  const [enteredAmount, setEnteredAmount] = useState(initialAmount);

  const bidder = useLocalBidderInformation();

  useEffect(() => setEnteredAmount(initialAmount), [initialAmount]);

  const isHighBidder = (bidder != null && bidder._id === currentBid.bidderId);

  const handleSubmit = (e) => {
    Meteor.call('items.bid',
      itemId,
      bidder._id,
      Number(enteredAmount));

    e.preventDefault();
  };

  return (
    <Container className="text-center">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <h5>Current Bid</h5>
            <h3>
              {formatCurrency(currentBid.amount)}
            </h3>
          </Col>
          <Col md={6}>
            <BidEntryWrapper bidder={bidder} isHighBidder={isHighBidder}>
              <BidEntry
                currentAmount={currentBid.amount}
                enteredAmount={enteredAmount}
                onEnteredAmountChange={setEnteredAmount}
                isHighBidder={isHighBidder}
              />
            </BidEntryWrapper>
          </Col>
        </Row>
        <Row>
          <Col>
            <BidSubmitWrapper bidder={bidder} isHighBidder={isHighBidder}>
              <Button type="submit">Bid</Button>
            </BidSubmitWrapper>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <BidderLoginWrapper bidder={bidder}>
            <BidderLogin />
          </BidderLoginWrapper>
        </Col>
      </Row>
    </Container>
  );
};

const BidSubmitWrapper = ({ bidder, isHighBidder, children }) => {
  if (!bidder) {
    return null;
  }

  return (
    <>
      <h6>Bidding as {bidder.emailAddress}</h6>
      {bidder.isValidated && !isHighBidder ? children : null}
    </>
  );
};

const BidEntryWrapper = ({ bidder, isHighBidder, children }) => {
  if (!bidder) {
    return (
      <p>
        In order to bid, please enter your e-mail address below.
        We&apos;ll use this to contact you if you win!
      </p>
    );
  }

  if (!bidder.isValidated) {
    return (
      <p>
        We sent you an e-mail to validate your e-mail address.
        Please click the link in the e-mail to enable bidding.
      </p>
    );
  }

  if (isHighBidder) {
    return <h5>You are currently <br /> the highest bidder!</h5>;
  }

  return children;
};

const BidderLoginWrapper = ({ bidder, children }) => {
  if (bidder) {
    return null;
  }

  return children;
};
