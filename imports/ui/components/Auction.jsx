import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuctionItem } from './AuctionItem';
import { groupBy, findNeighbor, byArtistAndTitle } from '../../util';

function bindToItem(fn, item) {
  if (fn == null) { return null; }

  return () => fn(item);
}

export const Auction = ({
  items, bidder, auction, selectedItemId, onSelectItem, onDeselectItem,
}) => {
  const itemsByCategory = groupBy(items, (item) => item.content.category);
  const categories = Object.keys(itemsByCategory);

  const flattenedItems = [];

  let onNavigateItem = (direction) => {
    const nextItem = findNeighbor(
      flattenedItems,
      (e) => e._id === selectedItemId,
      direction,
    );

    onSelectItem(nextItem);
  };

  if (onSelectItem == null) { onNavigateItem = null; }

  return categories.map((category) => {
    const sortedItems = itemsByCategory[category].sort(byArtistAndTitle);
    flattenedItems.push(...sortedItems);

    return (
      <Auction.Category
        key={category}
        category={category}
        items={sortedItems}
        bidder={bidder}
        auction={auction}
        selectedItemId={selectedItemId}
        onSelectItem={onSelectItem}
        onDeselectItem={onDeselectItem}
        onNavigateItem={onNavigateItem}
      />
    );
  });
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
      {items.map((item) => (
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
