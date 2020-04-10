import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const AuctionItem = ({ item, onSelectItem }) => (
  <Card>
    {/* <Card.Img variant="top" src={auctionItem.imageUrl} /> */}
    <Card.Body>
      <Card.Title>{item.content.title}</Card.Title>
      <Card.Subtitle>{item.content.artist}</Card.Subtitle>
      <Button onClick={() => onSelectItem(item)}>Details</Button>
    </Card.Body>
  </Card>
);
