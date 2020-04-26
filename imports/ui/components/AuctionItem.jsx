import { Meteor } from 'meteor/meteor';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import cx from 'classnames';

import { bidderStatus } from '../../util';
import { useToasts } from '../hooks/toasts';
import { useBidNotifications } from '../hooks/meteor';
import { AspectContainer } from './util/AspectContainer';
import { BidAmount } from './BidAmount';
import { ItemDetails } from './ItemDetails';

const AspectImg = styled(AspectContainer)`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.src});
`;

const OverlayHeader = styled(Card.Header)`
  position: absolute;
  width: 100%;
  z-index: 200;
  text-align: center;
  font-weight: bold;

  filter: opacity(75%);
`;

const ClosedHeader = ({ isClosed, isSold }) => {
  if (!isClosed) { return null; }

  return (
    <OverlayHeader className={cx({ 'bg-success': isSold, 'bg-light': !isSold })}>
      {isSold ? 'SOLD' : 'CLOSED'}
    </OverlayHeader>
  );
};

export const AuctionItem = ({
  item, bidder, auction, selected, onSelect, onDeselect, onNavigate,
}) => {
  const status = bidderStatus(item, bidder, auction);
  const { addToast } = useToasts();

  useBidNotifications(bidder._id, item._id, (notification) => {
    switch (notification.type) {
      case 'bid':
        addToast({
          variant: 'success',
          content: `Thanks for your bid on ${item.content.title}!`,
        });
        break;
      case 'outbid':
        addToast({
          variant: 'warning',
          content: (
            <Button variant="link" onClick={onSelect}>
              Uh-oh, you&apos;ve been outbid on {item.content.title}. Click here to get it back!
            </Button>
          ),
        });
        break;
      default: break;
    }
  });

  const onBid = (amount) => {
    Meteor.call('items.bid',
      item._id,
      bidder._id,
      amount);
  };

  return (
    <>
      <ItemDetails
        item={item}
        status={status}
        show={selected}
        onHide={onDeselect}
        onBid={onBid}
        onNavigate={onNavigate}
      />
      <Card onClick={onSelect}>
        <ClosedHeader isClosed={status.isClosed} isSold={status.isSold} />
        <Card.Img
          variant="top"
          src={item.content.previewImageUrl || item.content.fullImageUrl}
          as={AspectImg}
          ratio={2 / 1}
        />
        <Card.Body>
          <Card.Title>{item.content.title}</Card.Title>
          <Card.Subtitle>{item.content.artist}</Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <Button className="float-right" onClick={onSelect}>Details</Button>
          <BidAmount amount={item.currentBid.amount} status={status} />
        </Card.Footer>
      </Card>
    </>
  );
};
