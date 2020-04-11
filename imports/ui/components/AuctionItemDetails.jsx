import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { formatCurrency } from '../../util';
import { useItem } from '../hooks/meteor';
import { AuctionItemBid } from './AuctionItemBid';

export const AuctionItemDetails = ({ show, onHide, itemId }) => {
  const item = useItem(itemId);

  if (!item) {
    return <Modal show={show} onHide={onHide} />;
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{item.content.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          by {item.content.artist}
        </p>
        <p>
          Current bid: {formatCurrency(item.currentBid.amount)}
        </p>
        <AuctionItemBid auctionItem={item} currentBid={item.currentBid} />
      </Modal.Body>
    </Modal>
  );
};
