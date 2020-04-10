import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { formatCurrency } from '../../util';
import { useCurrentBid } from '../hooks/meteor';
import { AuctionItemBid } from './AuctionItemBid';

export const AuctionItemDetails = ({ show, onHide, auctionItem }) => {
  const itemId = auctionItem ? auctionItem._id : null;

  const emptyBid = { amount: 0 };
  const currentBid = useCurrentBid(itemId) || emptyBid;

  return (
    <Modal show={show} onHide={onHide}>
      {
        auctionItem == null ? null
          : (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{auctionItem.content.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  by {auctionItem.content.artist}
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
