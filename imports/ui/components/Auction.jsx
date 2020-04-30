import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuctionItem } from './AuctionItem';

function bindToItem(fn, item) {
  if (fn == null) { return null; }

  return () => fn(item);
}

function groupBy(arr, fn) {
  return arr.reduce(function(rv, x) {
    const key = fn(x);
    // eslint-disable-next-line no-param-reassign
    (rv[key] = rv[key] || []).push(x);
    return rv;
  }, {});
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
}) => {
  const itemsByCategory = groupBy(items, (item) => item.content.category);
  const categories = Object.keys(itemsByCategory);

  return categories.map((category) => (
    <Auction.Category
      key={category}
      category={category}
      items={itemsByCategory[category]}
      bidder={bidder}
      auction={auction}
      selectedItemId={selectedItemId}
      onSelectItem={onSelectItem}
      onDeselectItem={onDeselectItem}
      onNavigateItem={onNavigateItem}
    />
  ));
};

Auction.Category = ({
  category, items, bidder, auction,
  selectedItemId, onSelectItem, onDeselectItem, onNavigateItem,
}) => (
  <>
    <Row style={{ display: category == null ? 'none' : null }}>
      <Col><h4>{category}</h4></Col>
    </Row>
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
  </>
);
