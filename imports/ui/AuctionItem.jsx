import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { AuctionItemDetails } from './AuctionItemDetails'

const currencyFormat = new Intl.NumberFormat('en-US',
  {
    style: 'currency',
    currency: 'USD'
  }
);

export const AuctionItem = ({auctionItem}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => setShowDetails(true);
  const handleDetailsHide = (e) => setShowDetails(false);

  return (
    <Card>
      {/* <Card.Img variant="top" src={auctionItem.imageUrl} /> */}
      <Card.Body>
        <Card.Title>{auctionItem.title}</Card.Title>
        <Card.Subtitle>{auctionItem.artist}</Card.Subtitle>
        <Card.Text>{currencyFormat.format(auctionItem.bid)}</Card.Text>
        <Button onClick={handleDetailsClick}>Details</Button>
        <AuctionItemDetails show={showDetails} onHide={handleDetailsHide} auctionItem={auctionItem} />
      </Card.Body>
    </Card>
  );
};
