import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

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
      <Button onClick={() => onSelectItem(item)}>Details</Button>
    </Card.Body>
  </Card>
);
