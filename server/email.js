import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Templates from './templates/EmailTemplates';

Email.sendWithTemplate = ({ templateName, to, data }) => {
  const Template = Templates[templateName];
  const auctionTitle = "MCP's Not-So-Silent Auction";

  const content = ReactDOMServer.renderToString(
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
    html: content,
  });
};
