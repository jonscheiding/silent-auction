import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { ToastsProvider } from './hooks/toasts';
import { Layout } from './components/Layout';
import { RoutedAuction } from './components/RoutedAuction';
import { RoutedValidate } from './components/RoutedValidate';
import { RoutedValidateHelp } from './components/RoutedValidateHelp';

const history = createBrowserHistory();

export const App = () => (
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
          <Route path={['/items/:selectedItemId', '/']}>
            <RoutedAuction />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </ToastsProvider>
);
