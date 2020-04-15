import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

import { useToasts } from '../hooks/toasts';

const ToastWrapper = styled.div`
  position: fixed;
  z-index: 200;
  width: 100%;
  padding: 1rem;
`;

export const Toasts = () => {
  const { toasts, addToast, removeToast } = useToasts();

  return (
    <ToastWrapper>
      <Row>
        <Col sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 8 }}>
          {
            toasts.map((toast) => (
              <Toast
                key={toast.id}
                show={toast.show}
                onClose={() => removeToast(toast)}
                delay={5000}
                autohide
              >
                <Toast.Header>
                  <strong className="mr-auto">{toast.title}</strong>
                </Toast.Header>
                <Toast.Body>
                  {toast.text}
                </Toast.Body>
              </Toast>
            ))
          }
          <button
            type="button"
            style={{ position: 'absolute', top: 0, left: 0 }}
            onClick={() => addToast({ title: 'A toast!', text: 'To the groom!  To the bride!' })}
          >
            Test
          </button>
        </Col>
      </Row>
    </ToastWrapper>
  );
};
