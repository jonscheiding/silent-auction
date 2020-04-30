import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { BsCaretRightFill, BsCaretLeftFill } from 'react-icons/bs';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import YouTube from 'react-youtube';
import styled, { css } from 'styled-components';

import { AspectContainer } from './util/AspectContainer';
import { HtmlContent } from './util/HtmlContent';
import { BidControls } from './BidControls';

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
  item, status, show, onHide, onBid, onNavigate,
}) => {
  const canHide = onHide != null;
  const canNavigate = canHide;
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const toggleImageZoomed = () => setIsImageZoomed(!isImageZoomed);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <ItemDetails.Header item={item} status={status} canHide={canHide} />
      <Modal.Body>
        <div style={{ position: 'relative' }}>
          <ItemDetails.Navigate
            show={canNavigate}
            onClick={() => onNavigate(-1)}
            align="left"
          >
            <BsCaretLeftFill />
          </ItemDetails.Navigate>
          <ItemDetails.Navigate
            show={canNavigate}
            onClick={() => onNavigate(1)}
            align="right"
          >
            <BsCaretRightFill />
          </ItemDetails.Navigate>
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
            <div>{isImageZoomed ? <FiZoomOut /> : <FiZoomIn />}</div>
          </ItemDetails.Image>
        </div>
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

ItemDetails.Header = ({ item, status, canHide }) => (
  <Modal.Header closeButton={canHide}>
    <ClosedAlert isClosed={status.isClosed} isSold={status.isSold} />
    <Modal.Title>
      {item.content.title}
      <h5>by {item.content.artist}</h5>
      <h6><i>{item.content.medium}</i></h6>
    </Modal.Title>
  </Modal.Header>
);

ItemDetails.Navigate = styled.button`
  display: ${(props) => (props.show ? 'initial' : 'none')};
  position: absolute;
  top: 0;
  ${(props) => props.align}: 0;
  height: 100%;
  width: 2rem;

  border: none;
  padding: 0;
  &:focus, &:active {
    outline: none;
  }

  background: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }

  z-index: 5000;
`;

ItemDetails.Video = ({ videoId }) => {
  if (videoId == null) { return null; }

  return (
    <AspectContainer.Video ratio={16 / 9}>
      <YouTube videoId={videoId} opts={{ width: '100%', height: '100%' }} />
    </AspectContainer.Video>
  );
};

ItemDetails.Image = styled.button`
  border: none;
  background: none;
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
      max-height: 30vh;
      max-width: 100%;
    `)}
  }
`;

ItemDetails.Description = styled.div`
  padding: 0.5rem;
`;
