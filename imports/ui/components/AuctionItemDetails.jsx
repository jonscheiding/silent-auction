import React from 'react';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import styled from 'styled-components';

import { useItem } from '../hooks/meteor';
import { BidControls } from './BidControls';

const AspectContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;

  > div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

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
        {
          item.content.videoId
            ? (
              <AspectContainer>
                <YouTube videoId={item.content.videoId} opts={{ width: '100%', height: '100%' }} />
              </AspectContainer>
            )
            : (
              <img
                src={item.content.imageUrl}
                alt={item.content.title}
                style={{ width: '100%' }}
              />
            )
        }
      </Modal.Body>
      <Modal.Footer>
        <BidControls currentBid={item.currentBid} isClosed={item.isClosed} itemId={item._id} />
      </Modal.Footer>
    </Modal>
  );
};
