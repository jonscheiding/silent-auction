import React from 'react';
import Alert from 'react-bootstrap/Alert';
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
              <Alert
                key={toast.id}
                variant={toast.variant || 'primary'}
                show={toast.show}
                onClose={() => removeToast(toast.id)}
                dismissible
              >
                {toast.content}
              </Alert>
            ))
          }
          <button
            type="button"
            style={{ position: 'absolute', top: 0, left: 0 }}
            onClick={() => addToast({ content: 'To the groom!  To the bride!' })}
          >
            Test
          </button>
        </Col>
      </Row>
    </ToastWrapper>
  );
};
