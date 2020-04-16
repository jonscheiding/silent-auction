import React from 'react';
import Container from 'react-bootstrap/Container';

import { Splash } from './Splash';
import { Toasts } from './Toasts';
import { Banner } from './Banner';

export const Layout = ({ children }) => (
  <>
    <header>
      <Banner />
      <Toasts />
    </header>
    <main role="main">
      <Container>
        <Splash />
        {children}
      </Container>
    </main>
  </>
);
