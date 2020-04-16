import React from 'react';
import { Helmet } from 'react-helmet';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { HtmlContent } from './util/HtmlContent';
import { useCurrentAuction } from '../hooks/meteor';

export const Splash = () => {
  const auction = useCurrentAuction();

  if (auction._id == null) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{auction.content.title}</title>
      </Helmet>
      <Jumbotron>
        <h4>Welcome to {auction.content.title}</h4>
        <HtmlContent html={auction.content.welcomeMessage} />
      </Jumbotron>
    </>
  );
};
