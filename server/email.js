import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Templates from './templates/EmailTemplates';
import content from '../imports/api/content.json';

Email.sendWithTemplate = ({ templateName, to, data }) => {
  const Template = Templates[templateName];
  const auctionTitle = content.auction.title;

  const html = ReactDOMServer.renderToString(
    <Template
      baseUrl={Meteor.absoluteUrl()}
      auctionTitle={auctionTitle}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...data}
    />,
  );

  Email.send({
    to,
    subject: `${Template.subject} (${auctionTitle})`,
    from: process.env.MAIL_FROM,
    html,
  });
};
