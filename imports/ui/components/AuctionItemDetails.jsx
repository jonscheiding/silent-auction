import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { useItem } from '../hooks/meteor';
import { BidControls } from './BidControls';

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
        <BidControls currentBid={item.currentBid} itemId={item._id} />
      </Modal.Footer>
    </Modal>
  );
};
