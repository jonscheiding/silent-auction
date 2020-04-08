import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuctionItem } from './AuctionItem';
import { AuctionItemDetails } from './AuctionItemDetails';

export const AuctionItemList = ({ auctionItems }) => {
  const history = useHistory();
  const match = useRouteMatch('/items/:id');

  const closeDetails = () => history.push('/');
  const openDetails = (auctionItem) => history.push(`/items/${auctionItem.id}`);

  let detailsAuctionItem = null;

  if (match != null) {
    detailsAuctionItem = auctionItems.find((i) => i.id === match.params.id);
    if (!detailsAuctionItem) {
      setTimeout(() => closeDetails());
    }
  }

  return (
    <Row>
      {auctionItems.map((auctionItem) => (
        <Col md={4} key={auctionItem.id}>
          <AuctionItem auctionItem={auctionItem} onDetailsClick={() => openDetails(auctionItem)} />
        </Col>
      ))}
      <AuctionItemDetails
        show={detailsAuctionItem != null}
        onHide={closeDetails}
        auctionItem={detailsAuctionItem}
      />
    </Row>
  );
};
