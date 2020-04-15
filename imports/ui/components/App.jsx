import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Container from 'react-bootstrap/Container';

import { ToastsProvider } from '../hooks/toasts';
import { Auction } from './Auction';
import { Header } from './Header';
import { Splash } from './Splash';
import { Validate } from './Validate';
import { Toasts } from './Toasts';

const history = createBrowserHistory();

export const App = () => (
  <ToastsProvider>
    <Router history={history}>
      <Header />
      <Toasts />
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
  </ToastsProvider>
);
