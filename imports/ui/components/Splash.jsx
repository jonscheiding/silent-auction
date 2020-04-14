import React from 'react';
import { Helmet } from 'react-helmet';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { HtmlContent } from './HtmlContent';

import content from '/content.json';

export const Splash = () => (
  <>
    <Helmet>
      <title>{content.auction.title}</title>
    </Helmet>
    <Jumbotron>
      <h4>Welcome to {content.auction.title}</h4>
      <HtmlContent html={content.auction.welcomeMessage} />
    </Jumbotron>
  </>
);
