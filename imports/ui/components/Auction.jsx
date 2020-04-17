import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuctionItem } from './AuctionItem';

export const Auction = ({
  items, bidder, auction, selectedItemId, onSelectItem, onDeselectItem,
}) => (
  <Row>
    {items.map((item) => (
      <Col md={6} lg={4} key={item._id}>
        <AuctionItem
          item={item}
          bidder={bidder}
          auction={auction}
          selected={item._id === selectedItemId}
          onSelect={() => onSelectItem(item)}
          onDeselect={() => onDeselectItem(item)}
        />
      </Col>
    ))}
  </Row>
);
