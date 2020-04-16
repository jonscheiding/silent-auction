import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

import { positionFixed } from '../../util';
import { useToasts } from '../hooks/toasts';

const ToastWrapper = styled.div`
  ${positionFixed('100%')}

  z-index: 2000;
  padding: 1rem;

  pointer-events: none;
  
  .alert { pointer-events: auto; }
`;

export const Toasts = () => {
  const { toasts, removeToast } = useToasts();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <ToastWrapper className="fixed-adjust">
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
        </Col>
      </Row>
    </ToastWrapper>
  );
};
