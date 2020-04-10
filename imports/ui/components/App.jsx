import React from 'react';
import {
  Router, Switch, Route, useParams,
} from 'react-router';
import { createBrowserHistory } from 'history';
import Container from 'react-bootstrap/Container';

import { Auction } from './Auction';
import { Splash } from './Splash';

import auctionItems from '../auction-items.json';

const history = createBrowserHistory();

const AuctionWrapper = () => {
  const routeToSelectedItemId = (itemId) =>
    history.push(itemId === null ? '/' : `/items/${itemId}`);

  const { selectedItemId } = useParams();

  return (
    <Auction
      items={auctionItems}
      selectedItemId={selectedItemId}
      onSelectedItemIdChanged={routeToSelectedItemId}
    />
  );
};

export const App = () => (
  <Router history={history}>
    <main role="main">
      <Container>
        <Splash />
        <Switch>
          <Route path={['/items/:selectedItemId', '/']}>
            <AuctionWrapper />
          </Route>
        </Switch>
      </Container>
    </main>
  </Router>
);
