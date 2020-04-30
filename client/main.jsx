import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { useLocalStorage } from '@rehooks/local-storage';

import { LocalStorageFacade } from '/imports/ui/hooks/localStorage';
import { App } from '/imports/ui/App';

const history = createBrowserHistory();

Meteor.startup(() => {
  Meteor.subscribe('auctions');
  Meteor.subscribe('items');

  render(
    (
      <LocalStorageFacade.Provider value={useLocalStorage}>
        <App history={history} />
      </LocalStorageFacade.Provider>
    ),
    document.getElementById('react-target'),
  );
});
