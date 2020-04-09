import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Container from 'react-bootstrap/Container';

import { AuctionItemList } from './AuctionItemList';
import { Splash } from './Splash';

import auctionItems from '../auction-items.json';

const history = createBrowserHistory();

export const App = () => (
  <Router history={history}>
    <main role="main">
      <Container>
        <Splash />
        <AuctionItemList auctionItems={auctionItems} />
      </Container>
    </main>
  </Router>
);
