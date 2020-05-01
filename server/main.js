import { Meteor } from 'meteor/meteor';
import { onPageLoad } from 'meteor/server-render';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { createMemoryHistory } from 'history';

import { Auctions } from '../imports/api/auctions';
import { Bidders } from '../imports/api/bidders';
import { Items } from '../imports/api/items';
import { Notifications } from '../imports/api/notifications';

import Emails from '../imports/api/emails';
// import { App } from '../imports/ui/App';

// const history = createMemoryHistory();

onPageLoad((sink) => {
  const auction = Auctions.findOne({});
  sink.appendToHead(`<title>${auction.content.title}</title>`);
  // sink.renderIntoElementById('react-target',
  //   renderToString(<App history={history} />));
});

Meteor.startup(() => {
  let isInitializing = true;

  Notifications.find({}).observeChanges({
    added: (_, fields) => {
      if (isInitializing) { return; }

      const item = Items.findOne({ _id: fields.itemId });
      const bidder = Bidders.findOne({ _id: fields.bidderId });

      if (item == null || bidder == null) { return; }

      switch (fields.type) {
        case 'bid':
          Emails.bidReceived(bidder, item);
          break;
        case 'outbid':
          Emails.outbid(bidder, item);
          break;
        default: break;
      }
    },
  });

  isInitializing = false;
});
