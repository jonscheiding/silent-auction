import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import styled, { css } from 'styled-components';

import { useCurrentAuction } from '../hooks/meteor';
import { HtmlContent } from './util/HtmlContent';

import content from '/content.json';
import { positionFixed } from '../../util';

const NavbarFixed = styled.div`
  > .navbar {
    
    ${positionFixed('100%')}

    text-align: center;
    z-index: 100;
    justify-content: center;
  }

  padding-bottom: 56px;

  ${(props) => (props.show ? null : css`
    display: none;
  `)}
`;

export const Banner = () => {
  const auction = useCurrentAuction();

  return (
    <NavbarFixed show={auction.isLive && content.auction.liveMessage}>
      <Navbar bg="primary">
        <Navbar.Brand
          href={content.auction.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <HtmlContent html={content.auction.liveMessage} />
        </Navbar.Brand>
      </Navbar>
    </NavbarFixed>
  );
};
