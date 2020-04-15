import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import { formatCurrency } from '../../util';
import { useHighBidderMonitor } from '../hooks/effects';
import { useToasts } from '../hooks/toasts';

const AspectImg = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.src});
`;

export const AuctionItem = ({ item, onSelectItem }) => {
  const { addToast } = useToasts();

  useHighBidderMonitor(item, ({ gained, lost }) => {
    if (gained) {
      addToast({
        variant: 'success',
        content: `Thanks for your bid on ${item.content.title}!`,
      });
    } else if (lost) {
      addToast({
        variant: 'warning',
        content: `Uh-oh, you&apos;ve been outbid on ${item.content.title}!`,
      });
    }
  });

  return (
    <Card>
      <Card.Img
        variant="top"
        src={item.content.previewImageUrl || item.content.fullImageUrl}
        as={AspectImg}
      />
      <Card.Body>
        <Card.Title>{item.content.title}</Card.Title>
        <Card.Subtitle>{item.content.artist}</Card.Subtitle>
      </Card.Body>
      <Card.Footer>
        <Button className="float-right" onClick={() => onSelectItem(item)}>Details</Button>
        <h3>{formatCurrency(item.currentBid.amount)}</h3>
      </Card.Footer>
    </Card>
  );
};
