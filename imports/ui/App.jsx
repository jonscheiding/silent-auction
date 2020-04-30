import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { ToastsProvider } from './hooks/toasts';
import { Layout } from './components/Layout';
import { RoutedAuction } from './components/RoutedAuction';
import { RoutedValidate } from './components/RoutedValidate';
import { RoutedValidateHelp } from './components/RoutedValidateHelp';
import { RoutedLive } from './components/RoutedLive';

export const App = ({ history }) => (
  <ToastsProvider>
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/validate/help">
            <RoutedValidateHelp />
          </Route>
          <Route path="/validate/:validationCode">
            <RoutedValidate />
          </Route>
          <Route path="/live">
            <RoutedLive />
            <RoutedAuction />
          </Route>
          <Route path={['/items/:selectedItemId', '/']}>
            <RoutedAuction />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </ToastsProvider>
);
