import React from 'react';
import cx from 'classnames';

import { formatCurrency } from '../../util';

export const BidAmount = ({ amount, status }) => (
  <h3
    className={cx({
      'text-success': status.isWinning,
      'text-warning': status.isInterested,
    })}
  >
    {formatCurrency(amount)}
  </h3>
);
