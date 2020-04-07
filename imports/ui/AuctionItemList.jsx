import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuctionItem } from './AuctionItem';

export const AuctionItemList = ({auctionItems}) => (
  <Row>
    {auctionItems.map((auctionItem, i) => (
      <Col md={4}>
        <AuctionItem key={i} auctionItem={auctionItem} />
      </Col>
    ))}
  </Row>
);
