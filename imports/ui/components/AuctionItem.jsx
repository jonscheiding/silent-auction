import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import cx from 'classnames';

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

  const highBidder = useHighBidderMonitor(item._id, ({ gained, lost }) => {
    if (gained) {
      addToast({
        variant: 'success',
        content: `Thanks for your bid on ${item.content.title}!`,
      });
    } else if (lost) {
      addToast({
        variant: 'warning',
        content: (
          <Link to={`/items/${item._id}`}>
            Uh-oh, you&apos;ve been outbid on {item.content.title}. Click here to get it back!
          </Link>
        ),
      });
    }
  });

  return (
    <Card onClick={() => onSelectItem(item)}>
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
        <h3
          className={cx({
            'text-success': highBidder.current,
            'text-warning': highBidder.previous,
          })}
        >{formatCurrency(item.currentBid.amount)}
        </h3>
      </Card.Footer>
    </Card>
  );
};
