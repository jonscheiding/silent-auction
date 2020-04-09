import React from 'react';
// import { useHistory, useRouteMatch } from 'react-router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useRouteItemId } from '../hooks/routing';
import { AuctionItem } from './AuctionItem';
import { AuctionItemDetails } from './AuctionItemDetails';

export const AuctionItemList = ({ auctionItems }) => {
  // const history = useHistory();
  // const match = useRouteMatch('/items/:id');

  const [routeItemId, setRouteItemId] = useRouteItemId();

  let detailsAuctionItem = null;

  const openDetails = (auctionItem) => setRouteItemId(auctionItem.id);
  const closeDetails = () => setRouteItemId(null);

  if (routeItemId != null) {
    detailsAuctionItem = auctionItems.find((i) => i.id === routeItemId);
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
        show={detailsAuctionItem !== null}
        onHide={closeDetails}
        auctionItem={detailsAuctionItem || {}}
      />
    </Row>
  );
};
