import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { formatCurrency } from '../../util';
import { useCurrentBid } from '../hooks/meteor';
import { AuctionItemBid } from './AuctionItemBid';

export const AuctionItemDetails = ({ show, onHide, auctionItem }) => {
  const itemId = auctionItem ? auctionItem.id : null;

  const currentBid = useCurrentBid(itemId) || { amount: 0 };

  return (
    <Modal show={show} onHide={onHide}>
      {
        auctionItem == null ? null
          : (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{auctionItem.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  by {auctionItem.artist}
                </p>
                <p>
                  Current bid: {formatCurrency(currentBid.amount)}
                </p>
                <AuctionItemBid auctionItem={auctionItem} currentBid={currentBid} />
              </Modal.Body>
            </>
          )
      }
    </Modal>
  );
};
