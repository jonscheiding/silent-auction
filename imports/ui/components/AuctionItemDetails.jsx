import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatCurrency } from '../../util';
import { useItem } from '../hooks/meteor';
import { AuctionItemBid } from './AuctionItemBid';

export const AuctionItemDetails = ({ show, onHide, itemId }) => {
  const item = useItem(itemId);

  if (!item) {
    return <Modal show={show} onHide={onHide} />;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {item.content.title}
          <h5>by {item.content.artist}</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={item.content.imageUrl}
          alt={item.content.title}
          style={{ width: '100%' }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col md={6}>
              Current bid:
              <br />
              {formatCurrency(item.currentBid.amount)}
            </Col>
            <Col md={6}>
              <AuctionItemBid item={item} />
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};
