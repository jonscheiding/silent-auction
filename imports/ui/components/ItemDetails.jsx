import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import YouTube from 'react-youtube';
import styled, { css } from 'styled-components';

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
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const toggleImageZoomed = () => setIsImageZoomed(!isImageZoomed);

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
          show={item.content.videoId == null}
          zoom={isImageZoomed}
          onClick={toggleImageZoomed}
        >
          <img
            src={item.content.fullImageUrl || item.content.previewImageUrl}
            alt={item.content.title}
          />
        </ItemDetails.Image>
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

ItemDetails.Image = styled.button`
  border: none;
  padding: 0;
  width: 100%;
  text-align: center;

  display: ${(props) => (props.show ? 'initial' : 'none')};
  cursor: ${(props) => (props.zoom ? 'zoom-out' : 'zoom-in')} !important;

  &:focus, &:active {
    outline: none;
  }
  
  > img {
    ${(props) => (props.zoom
    ? css`width: 100%;`
    : css`
      max-height: 30vw;
      max-width: 100%;
    `)}
  }
`;

ItemDetails.Description = styled.div`
  padding: 0.5rem;
`;
