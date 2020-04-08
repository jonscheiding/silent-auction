import React from 'react';
import Modal from 'react-bootstrap/Modal';

import AuctionItemBid from './AuctionItemBid';

export const AuctionItemDetails = ({show, onHide, auctionItem}) => (
  <Modal show={show} onHide={onHide}>
    {
      auctionItem == null ? null : 
        <>
          <Modal.Header closeButton>
            <Modal.Title>{auctionItem.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>by {auctionItem.artist}</p>
            <AuctionItemBid auctionItem={auctionItem} />
          </Modal.Body>
        </>
    }
  </Modal>
);
