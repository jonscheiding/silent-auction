import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { formatCurrency } from '../../util';
import { AuctionItemBid } from './AuctionItemBid';
import { Bids } from '../../api/bids';

export const AuctionItemDetails = ({ show, onHide, auctionItem }) => {
  const currentBid = useTracker(() => {
    if (auctionItem == null) return { amount: 0 };

    Meteor.subscribe('bids.current', auctionItem.id);

    return Bids.findOne({ itemId: auctionItem.id })
      || { amount: 0 };
  });

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
