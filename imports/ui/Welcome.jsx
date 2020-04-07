import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { BidderLoginPrompt } from './BidderLoginPrompt';

export const Welcome = () => (
  <Jumbotron>
    <h1>MCP's Not-So-Silent Auction</h1>
    <BidderLoginPrompt />
  </Jumbotron>
);
