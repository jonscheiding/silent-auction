import React from 'react';
import { Helmet } from 'react-helmet';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Accordion from 'react-bootstrap/Accordion';

import styled from 'styled-components';
import { HtmlContent } from './util/HtmlContent';
import { useCurrentAuction } from '../hooks/meteor';

const JumbotronBg = styled(Jumbotron)`
  background-image: url(${(props) => props.backgroundImageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

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
      <JumbotronBg backgroundImageUrl={auction.content.bannerImageUrl}>
        <div />
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <h4>Welcome to {auction.content.title}</h4>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <HtmlContent html={auction.content.welcomeMessage} />
          </Accordion.Collapse>
        </Accordion>
      </JumbotronBg>
    </>
  );
};
