import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import Container from 'react-bootstrap/Container';

import { Auction } from './Auction';
import { Splash } from './Splash';
import { Validate } from './Validate';

import auctionItems from '../auction-items.json';

const history = createBrowserHistory();

export const App = () => (
  <Router history={history}>
    <main role="main">
      <Container>
        <Splash />
        <Switch>
          <Route path="/validate/:validationCode">
            <Validate.WithRouter />
          </Route>
          <Route path={['/items/:selectedItemId', '/']}>
            <Auction.WithRouter items={auctionItems} />
          </Route>
        </Switch>
      </Container>
    </main>
  </Router>
);
