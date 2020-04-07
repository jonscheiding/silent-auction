import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const BidderLoginDialog = ({show, onHide}) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Body>
      <p>In order to bid, you must provide a valid e-mail address. We will contact you using this e-mail address if you win.</p>
      <Form>
        <Form.Group>
          <Form.Control type="email" placeholder="Email address" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Validate
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
);
