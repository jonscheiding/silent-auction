import React from 'react';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import styled from 'styled-components';

import { useItem } from '../hooks/meteor';
import { AspectContainer } from './AspectContainer';
import { BidControls } from './BidControls';
import { HtmlContent } from './HtmlContent';

const ContentWrapper = styled.div`
  padding: 1rem;
  text-align: justify;
`;

const AspectVideo = styled(AspectContainer)`
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

export const AuctionItemDetails = ({ onHide, itemId }) => {
  const show = itemId != null;
  const canHide = onHide != null;
  const item = useItem(itemId);

  if (!item) {
    return <Modal show={show} onHide={onHide} />;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton={canHide}>
        <Modal.Title>
          {item.content.title}
          <h5>by {item.content.artist}</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          item.content.videoId
            ? (
              <AspectVideo ratio={16 / 9}>
                <YouTube videoId={item.content.videoId} opts={{ width: '100%', height: '100%' }} />
              </AspectVideo>
            )
            : (
              <img
                src={item.content.fullImageUrl}
                alt={item.content.title}
                style={{ width: '100%' }}
              />
            )
        }
        <ContentWrapper>
          <HtmlContent html={item.content.description} />
        </ContentWrapper>
      </Modal.Body>
      <Modal.Footer>
        <BidControls
          currentBid={item.currentBid}
          previousBids={item.bids}
          isClosed={item.isClosed}
          itemId={item._id}
        />
      </Modal.Footer>
    </Modal>
  );
};
