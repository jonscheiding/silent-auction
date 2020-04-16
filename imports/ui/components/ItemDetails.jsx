import React from 'react';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import styled from 'styled-components';

import { AspectContainer } from './util/AspectContainer';
import { BidControls } from './BidControls';

const AspectVideo = styled(AspectContainer)`
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

export const ItemDetails = ({
  item, status, show, onHide, onBid,
}) => {
  const canHide = onHide != null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton={canHide}>
        <Modal.Title>
          {item.content.title}
          <h5>by {item.content.artist}</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ItemDetails.Video videoId={item.content.videoId} />
        <ItemDetails.Image
          src={item.content.fullImageUrl || item.content.previewImageUrl}
          alt={item.content.title}
          show={item.content.videoId == null}
        />
      </Modal.Body>
      <Modal.Footer>
        <BidControls
          currentAmount={item.currentBid.amount}
          status={status}
          onBid={onBid}
        />
      </Modal.Footer>
    </Modal>
  );
};

ItemDetails.Video = ({ videoId }) => {
  if (videoId == null) { return null; }

  return (
    <AspectVideo ratio={16 / 9}>
      <YouTube videoId={videoId} opts={{ width: '100%', height: '100%' }} />
    </AspectVideo>
  );
};

ItemDetails.Image = ({ src, alt, show }) => {
  if (!show || src == null) { return null; }

  return <img src={src} alt={alt} style={{ width: '100%' }} />;
};
