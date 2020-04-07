import React, { useState } from 'react';

import { useBidderEmail } from './bidderEmail';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const BidderLoginDialog = ({show, onHide}) => {
  const [bidderEmail, setBidderEmail] = useBidderEmail();
  const [enteredEmail, setEnteredEmail] = useState(bidderEmail);

  const handleEmailChange = (e) => setEnteredEmail(e.target.value);
  
  const handleValidateClick = (e) => {
    setBidderEmail(enteredEmail);
    e.preventDefault();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <p>In order to bid, you must provide a valid e-mail address. We will contact you using this e-mail address if you win.</p>
        <Form>
          <Form.Group>
            <Form.Control type="email" 
              value={enteredEmail} onChange={handleEmailChange}
              placeholder="Email address" />
          </Form.Group>
          <Button variant="primary" onClick={handleValidateClick} type="submit">
            Validate
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
