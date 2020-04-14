import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styled, { css } from 'styled-components';

import { Auction } from './Auction';
import { Splash } from './Splash';
import { Validate } from './Validate';
import { useCurrentAuction } from '../hooks/meteor';

import content from '/content.json';

const history = createBrowserHistory();

const Header = styled.header`
  > .navbar {
    position: fixed;
    width: 100%;
    text-align: center;
    z-index: 100;
    justify-content: center;
  }

  padding-bottom: 5rem;

  ${(props) => (props.show ? null : css`
    display: none;
  `)}
`;

export const App = () => {
  const auction = useCurrentAuction();

  return (
    <Router history={history}>
      <Header show={auction.isLive && content.auction.liveStreamUrl}>
        <Navbar bg="primary">
          <Navbar.Brand
            href={content.auction.liveStreamUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Now live at {content.auction.liveStreamUrl}!
          </Navbar.Brand>
        </Navbar>
      </Header>
      <main>
        <Container>
          <Splash />
          <Switch>
            <Route path="/validate/:validationCode">
              <Validate.WithRouter />
            </Route>
            <Route path={['/items/:selectedItemId', '/']}>
              <Auction.WithRouter />
            </Route>
          </Switch>
        </Container>
      </main>
    </Router>
  );
};
