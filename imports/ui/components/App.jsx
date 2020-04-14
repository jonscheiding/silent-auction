import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import Container from 'react-bootstrap/Container';

import { Auction } from './Auction';
import { Header } from './Header';
import { Splash } from './Splash';
import { Validate } from './Validate';

const history = createBrowserHistory();

export const App = () => (
  <Router history={history}>
    <Header />
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
