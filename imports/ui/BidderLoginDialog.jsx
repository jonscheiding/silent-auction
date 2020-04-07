import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data'

import { useBidderEmail } from './bidderEmail';

import { Bidders } from '../api/bidders';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const BidderLoginDialog = ({show, onHide}) => {
  const [bidderEmail, setBidderEmail] = useBidderEmail();
  const [enteredEmail, setEnteredEmail] = useState(bidderEmail);

  const bidderInformation = useTracker(() => 
    Bidders.findOne({bidderEmail: enteredEmail}));

  const handleEmailChange = (e) => setEnteredEmail(e.target.value);
  
  const handleValidateClick = (e) => {
    Bidders.insert({
      bidderEmail: enteredEmail
    });

    setBidderEmail(enteredEmail);
    e.preventDefault();
  }

  const bidderEmailPrompt = (
    <>
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
    </>
  );

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        {
          bidderInformation === undefined
            ? bidderEmailPrompt
            : <div>Pending</div>
        }
      </Modal.Body>
    </Modal>
  );
};
