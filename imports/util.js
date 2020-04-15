import { css } from 'styled-components';

const currencyFormat = new Intl.NumberFormat('en-US',
  {
    style: 'currency',
    currency: 'USD',
  });

export const formatCurrency = (amount) => currencyFormat.format(amount);

export const positionFixed = (width) => css`
    position: fixed;
    width: calc(${width} - var(--fixed-adjust));
`;
