import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import { useCurrentAuction } from '../hooks/meteor';
import { HtmlContent } from './util/HtmlContent';
import { useRouter } from '../hooks/router';

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

  if (auction.isLive && auction.liveVideoId) {
    return {
      message: auction.content.liveMessage || 'Click to watch the live event!',
      bg: 'primary',
    };
  }

  return null;
}

export const Banner = () => {
  const auction = useCurrentAuction();
  const status = auctionStatus(auction);
  const router = useRouter();

  if (status == null) { return null; }

  return (
    <NavbarFixed>
      <Navbar bg={status.bg}>
        <Navbar.Brand
          as={Button}
          onClick={router.navigate.live}
          variant="link"
        >
          <HtmlContent html={status.message} />
        </Navbar.Brand>
      </Navbar>
    </NavbarFixed>
  );
};
