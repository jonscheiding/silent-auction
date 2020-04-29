import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

import { useCurrentAuction } from '../hooks/meteor';
import { HtmlContent } from './util/HtmlContent';

const NavbarFixed = styled.div`
  > .navbar {
    
    position: fixed;
    width: 100%;

    text-align: center;
    z-index: 100;
    justify-content: center;
  }

  padding-bottom: 56px;
`;

function auctionStatus(auction) {
  if (auction.content == null) { return null; }

  if (!auction.isStarted) {
    return {
      message: auction.content.notStartedMessage || 'The auction has not started yet!',
      bg: 'warning',
    };
  }

  if (auction.isEnded) {
    return {
      message: auction.content.endedMessage || 'The auction has ended!',
      bg: 'warning',
    };
  }

  if (auction.isLive && (
    auction.content.liveMessage
    || auction.liveUrl
    || auction.content.liveUrl)) {
    return {
      message: auction.content.liveMessage || 'Click to join the live event!',
      url: auction.liveUrl || auction.content.liveUrl,
      bg: 'primary',
    };
  }

  return null;
}

export const Banner = () => {
  const auction = useCurrentAuction();
  const status = auctionStatus(auction);

  if (status == null) { return null; }

  return (
    <NavbarFixed>
      <Navbar bg={status.bg}>
        <Navbar.Brand
          href={status.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ whiteSpace: 'break-spaces' }}
        >
          <HtmlContent html={status.message} />
        </Navbar.Brand>
      </Navbar>
    </NavbarFixed>
  );
};
