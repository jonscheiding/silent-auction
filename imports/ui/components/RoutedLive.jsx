import React from 'react';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';

import { useItem, useLocalBidderInformation, useCurrentAuction } from '../hooks/meteor';
import { bidderStatus } from '../../util';
import { AspectContainer } from './util/AspectContainer';
import { BidControls } from './BidControls';
import { ItemDetails } from './ItemDetails';
import { useRouter } from '../hooks/router';

export const RoutedLive = () => {
  const router = useRouter();
  const bidder = useLocalBidderInformation();
  const auction = useCurrentAuction();
  const activeItem = useItem(auction.activeItemId);

  if (auction._id == null) { return null; }
  if (!auction.isLive) {
    setTimeout(router.navigate.main);
    return null;
  }

  return (
    <Modal show size="lg" onHide={router.navigate.main}>
      <RoutedLive.ModalContents item={activeItem} bidder={bidder} auction={auction}>
        <AspectContainer.Video ratio={16 / 9}>
          <YouTube videoId={auction.liveVideoId} opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1 } }} />
        </AspectContainer.Video>
      </RoutedLive.ModalContents>
    </Modal>
  );
};

RoutedLive.ModalContents = ({
  children, item, bidder, auction,
}) => {
  if (item == null) {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>
            {auction.content.title}
            <h5>LIVE</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </>
    );
  }

  const status = bidderStatus(item, bidder, auction);

  return (
    <>
      <ItemDetails.Header item={item} status={status} canHide />
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <BidControls currentAmount={item.currentBid.amount} status={status} />
      </Modal.Footer>
    </>
  );
};
