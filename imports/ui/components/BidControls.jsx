import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import cx from 'classnames';

import { formatCurrency } from '../../util';
import { useLocalBidderInformation } from '../hooks/meteor';
import { BidEntry } from './BidEntry';
import { BidderLogin } from './BidderLogin';
import { BidderIdentification } from './BidderIdentification';

export const BidControls = ({
  currentBid, previousBids, isClosed, itemId,
}) => {
  const initialAmount = currentBid.amount + 10;
  const [enteredAmount, setEnteredAmount] = useState(initialAmount);

  const bidder = useLocalBidderInformation();

  useEffect(() => setEnteredAmount(initialAmount), [initialAmount]);

  const isHighBidder = (bidder != null && bidder._id === currentBid.bidderId);
  const isPreviousBidder = !isHighBidder
    && (bidder != null && previousBids.find((b) => b.bidderId === bidder._id) != null);

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
            <h3 className={cx({
              'text-success': isHighBidder,
              'text-warning': isPreviousBidder,
            })}
            >
              {formatCurrency(currentBid.amount)}
            </h3>
          </Col>
          <Col md={6}>
            <BidEntryWrapper bidder={bidder} isClosed={isClosed} isHighBidder={isHighBidder}>
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
            <BidSubmitWrapper bidder={bidder} isClosed={isClosed} isHighBidder={isHighBidder}>
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

const BidSubmitWrapper = ({
  bidder, isHighBidder, isClosed, children,
}) => {
  if (!bidder || isClosed) {
    return null;
  }

  return (
    <>
      <BidderIdentification />
      {bidder.isValidated && !isHighBidder ? children : null}
    </>
  );
};

const BidEntryWrapper = ({
  bidder, isHighBidder, isClosed, children,
}) => {
  const handleResendClick = () => {
    Meteor.call('bidders.resendValidation', bidder._id);
  };

  if (isClosed) {
    return <h3>Bidding is closed for this item.</h3>;
  }

  if (!bidder) {
    return (
      <p>
        In order to bid, please enter your e-mail address below.
        We&apos;ll use this to contact you
        for payment and delivery arrangements if you win something!
      </p>
    );
  }

  if (!bidder.isValidated) {
    return (
      <p>
        We sent you a a link to validate your e-mail address.
        Please click it to start bidding.<br />
        <Button variant="link" onClick={handleResendClick}>Click here to get it re-sent.</Button>
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
