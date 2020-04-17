import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

import { CANNOT_BID_REASON } from '../../util';
import { BidAmount } from './BidAmount';
import { BidEntry } from './BidEntry';
import { BidderIdentification } from './BidderIdentification';

const BidEntryRow = styled(Row)`
  [class^=col] {
    margin-bottom: 0.5rem;
  }
`;

export const BidControls = ({ currentAmount, status, onBid }) => {
  const minimumAmount = currentAmount + 1;
  const initialAmount = currentAmount + 10;
  const [enteredAmount, setEnteredAmount] = useState(initialAmount);

  const handleSubmit = (e) => {
    onBid(Number(enteredAmount));
    e.preventDefault();
  };

  return (
    <Container className="text-center">
      <Form onSubmit={handleSubmit}>
        <BidEntryRow className="justify-content-center">
          <Col md={6} lg={5}>
            <h5>Current Bid</h5>
            <BidAmount
              amount={currentAmount}
              status={status}
            />
          </Col>
          <Col md={6} lg={5}>
            <BidControls.BidEntry status={status}>
              <BidEntry
                minimumAmount={minimumAmount}
                initialAmount={initialAmount}
                enteredAmount={enteredAmount}
                onEnteredAmountChange={(value) => setEnteredAmount(value)}
              />
            </BidControls.BidEntry>
          </Col>
          <Col lg={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Button disabled={!status.canBid} type="submit" size="lg" style={{ width: '100%' }}>
              Bid
            </Button>
          </Col>
        </BidEntryRow>
      </Form>
      <Row>
        <Col>
          <BidderIdentification />
        </Col>
      </Row>
    </Container>
  );
};


BidControls.BidEntry = ({ status, children }) => {
  switch (status.cannotBidReason) {
    case CANNOT_BID_REASON.ALREADY_WINNING:
      return <h5>You are currently the highest bidder. Congratulations!</h5>;
    case CANNOT_BID_REASON.ITEM_CLOSED:
      return <h3>Bidding for this item is closed.</h3>;
    case CANNOT_BID_REASON.AUCTION_NOT_STARTED:
      return <h3>The auction has not started yet.</h3>;
    case CANNOT_BID_REASON.AUCTION_ENDED:
      return <h3>The auction has ended.</h3>;
    case CANNOT_BID_REASON.NOT_VALIDATED:
      return (
        <p>
          We sent you a a link to validate your e-mail address.
          Please click it to start bidding.<br />
        </p>
      );
    case CANNOT_BID_REASON.NOT_LOGGED_IN:
      return (
        <p>
          In order to bid, please enter your e-mail address.
          We&apos;ll use this to contact you
          for payment and delivery arrangements if you win something!
        </p>
      );
    case null: return children;
    default: return null;
  }
};
