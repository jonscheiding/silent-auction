import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import { formatCurrency } from '../../util';

const AspectImg = styled.div`
  position:relative;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.src});
`;

export const AuctionItem = ({ item, onSelectItem }) => (
  <Card>
    <Card.Img variant="top" src={item.content.thumbnailUrl} as={AspectImg} />
    <Card.Body>
      <Card.Title>{item.content.title}</Card.Title>
      <Card.Subtitle>{item.content.artist}</Card.Subtitle>
    </Card.Body>
    <Card.Footer>
      <Button className="float-right" onClick={() => onSelectItem(item)}>Details</Button>
      <h3>{formatCurrency(item.currentBid.amount)}</h3>
    </Card.Footer>
  </Card>
);
