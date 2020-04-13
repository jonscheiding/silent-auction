import React from 'react';
import { Helmet } from 'react-helmet';
import Jumbotron from 'react-bootstrap/Jumbotron';

import content from '../../api/content.json';

export const Splash = () => (
  <>
    <Helmet>
      <title>{content.auction.title}</title>
    </Helmet>
    <Jumbotron className="text-center">
      <h1>Welcome to {content.auction.title}!</h1>
      <h5>{content.auction.welcomeMessage}</h5>
      <h5>{content.auction.detailsMessage}</h5>
    </Jumbotron>
  </>
);
