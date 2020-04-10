import React from 'react';
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
