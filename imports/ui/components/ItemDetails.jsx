import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import YouTube from 'react-youtube';
import styled from 'styled-components';

import { AspectContainer } from './util/AspectContainer';
import { HtmlContent } from './util/HtmlContent';
import { BidControls } from './BidControls';

const AspectVideo = styled(AspectContainer)`
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

const HeaderAlert = styled(Alert)`
  position: absolute;
  right: 3rem;
  top: 1.5rem;
`;

const ClosedAlert = ({ isClosed, isSold }) => {
  if (!isClosed) { return null; }

  return (
    <HeaderAlert
      className="d-none d-sm-block"
      variant={isSold ? 'success' : 'secondary'}
    >
      {isSold ? 'SOLD' : 'CLOSED'}
    </HeaderAlert>
  );
};

export const ItemDetails = ({
  item, status, show, onHide, onBid,
}) => {
  const canHide = onHide != null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton={canHide}>
        <ClosedAlert isClosed={status.isClosed} isSold={status.isSold} />
        <Modal.Title>
          {item.content.title}
          <h5>by {item.content.artist}</h5>
          <h6><i>{item.content.medium}</i></h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ItemDetails.Video videoId={item.content.videoId} />
        <ItemDetails.Image
          src={item.content.fullImageUrl || item.content.previewImageUrl}
          alt={item.content.title}
          show={item.content.videoId == null}
        />
        <ItemDetails.Description>
          <HtmlContent html={item.content.description} />
        </ItemDetails.Description>
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

ItemDetails.Description = styled.div`
  padding: 0.5rem;
`;
