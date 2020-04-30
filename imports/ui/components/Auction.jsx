import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuctionItem } from './AuctionItem';

function bindToItem(fn, item) {
  if (fn == null) { return null; }

  return () => fn(item);
}

function byArtistAndTitle(a, b) {
  if (a.content.artist < b.content.artist) { return -1; }
  if (a.content.artist > b.content.artist) { return 1; }
  if (a.content.title < b.content.title) { return -1; }
  if (a.content.title > b.content.title) { return 1; }
  return 0;
}

export const Auction = ({
  items, bidder, auction, selectedItemId, onSelectItem, onDeselectItem, onNavigateItem,
}) => (
  <Row>
    {items.sort(byArtistAndTitle).map((item) => (
      <Col md={6} lg={4} key={item._id}>
        <AuctionItem
          item={item}
          bidder={bidder}
          auction={auction}
          selected={item._id === selectedItemId}
          onSelect={bindToItem(onSelectItem, item)}
          onDeselect={bindToItem(onDeselectItem, item)}
          onNavigate={onNavigateItem}
        />
      </Col>
    ))}
  </Row>
);
