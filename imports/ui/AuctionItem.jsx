import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const currencyFormat = new Intl.NumberFormat('en-US',
  {
    style: 'currency',
    currency: 'USD'
  }
);

export const AuctionItem = ({auctionItem, onDetailsClick}) => {
  return (
    <Card>
      {/* <Card.Img variant="top" src={auctionItem.imageUrl} /> */}
      <Card.Body>
        <Card.Title>{auctionItem.title}</Card.Title>
        <Card.Subtitle>{auctionItem.artist}</Card.Subtitle>
        <Card.Text>{currencyFormat.format(auctionItem.bid)}</Card.Text>
        <Button onClick={onDetailsClick}>Details</Button>        
      </Card.Body>
    </Card>
  );
};
