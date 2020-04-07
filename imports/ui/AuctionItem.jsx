import React from 'react';
import Card from 'react-bootstrap/Card';

export const AuctionItem = ({auctionItem}) => (
  <Card>
    <Card.Img variant="top" src={auctionItem.imageUrl} />
    <Card.Body>
      <Card.Title>{auctionItem.title}</Card.Title>
      <Card.Subtitle>{auctionItem.artist}</Card.Subtitle>
      <Card.Text>{auctionItem.bid}</Card.Text>
    </Card.Body>
  </Card>
);
