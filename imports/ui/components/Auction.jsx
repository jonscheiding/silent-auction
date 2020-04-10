import React from 'react';
import { useHistory, useParams } from 'react-router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuctionItem } from './AuctionItem';
import { AuctionItemDetails } from './AuctionItemDetails';

export const Auction = ({ items, selectedItemId, onSelectedItemIdChanged }) => {
  let selectedItem = null;

  const setSelectedItem = (item) => onSelectedItemIdChanged(item.id);
  const clearSelectedItem = () => onSelectedItemIdChanged(null);

  if (selectedItemId != null) {
    selectedItem = items.find((i) => i.id === selectedItemId);
    if (!selectedItem) {
      setTimeout(() => onSelectedItemIdChanged(null));
    }
  }

  return (
    <Row>
      {items.map((item) => (
        <Col md={4} key={item.id}>
          <AuctionItem item={item} onSelectItem={setSelectedItem} />
        </Col>
      ))}
      <AuctionItemDetails
        show={selectedItem !== null}
        onHide={clearSelectedItem}
        auctionItem={selectedItem || {}}
      />
    </Row>
  );
};

Auction.WithRouter = ({ items }) => {
  const history = useHistory();

  const routeToSelectedItemId = (itemId) =>
    history.push(itemId === null ? '/' : `/items/${itemId}`);

  const { selectedItemId } = useParams();

  return (
    <Auction
      items={items}
      selectedItemId={selectedItemId}
      onSelectedItemIdChanged={routeToSelectedItemId}
    />
  );
};
