import React from 'react';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from '../hooks/router';
import { HtmlContent } from './util/HtmlContent';
import { useCurrentAuction } from '../hooks/meteor';

export const RoutedValidateHelp = () => {
  const { navigate } = useRouter();
  const auction = useCurrentAuction();

  if (auction.content == null) { return null; }

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <HtmlContent html={auction.content.validationHelpMessage} />
          <Button onClick={navigate.main} size="lg" className="float-right">
            Go Back
          </Button>
        </Col>
      </Row>
    </>
  );
};
