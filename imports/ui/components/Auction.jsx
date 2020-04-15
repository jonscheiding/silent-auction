import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuctionItem } from './AuctionItem';
import { AuctionItemDetails } from './AuctionItemDetails';
import { useItems, useCurrentAuction } from '../hooks/meteor';

export const Auction = ({ selectedItemId, onSelectedItemIdChanged }) => {
  const setSelectedItem = (item) => onSelectedItemIdChanged(item._id);
  const clearSelectedItem = () => onSelectedItemIdChanged(null);

  const items = useItems();
  const currentAuction = useCurrentAuction();

  if (currentAuction.activeItemId && selectedItemId) {
    clearSelectedItem();
  }

  const detailsItemId = currentAuction.activeItemId || selectedItemId;
  const canSelectItem = currentAuction.activeItemId == null;

  return (
    <Row>
      {items.map((item) => (
        <Col md={4} key={item._id}>
          <AuctionItem item={item} onSelectItem={canSelectItem ? setSelectedItem : null} />
        </Col>
      ))}

      <AuctionItemDetails
        onHide={canSelectItem ? clearSelectedItem : null}
        itemId={detailsItemId}
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
