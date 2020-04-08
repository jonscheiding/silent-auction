import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Container from 'react-bootstrap/Container';

import { BidderEmailProvider } from '../localBidder';
import { AuctionItemList } from './AuctionItemList';
import { Splash } from './Splash';

import auctionItems from '../auction-items.json';

const history = createBrowserHistory();

export const App = () => (
  <BidderEmailProvider>
    <Router history={history}>
      <main role="main">
        <Container>
          <Splash />
          <AuctionItemList auctionItems={auctionItems} />
        </Container>
      </main>
    </Router>
  </BidderEmailProvider>
);
