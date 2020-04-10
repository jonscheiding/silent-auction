import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import Container from 'react-bootstrap/Container';

import { useItems } from '../hooks/meteor';
import { Auction } from './Auction';
import { Splash } from './Splash';
import { Validate } from './Validate';

const history = createBrowserHistory();

export const App = () => {
  const items = useItems();

  return (
    <Router history={history}>
      <main role="main">
        <Container>
          <Splash />
          <Switch>
            <Route path="/validate/:validationCode">
              <Validate.WithRouter />
            </Route>
            <Route path={['/items/:selectedItemId', '/']}>
              <Auction.WithRouter items={items} />
            </Route>
          </Switch>
        </Container>
      </main>
    </Router>
  );
};
