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

export const CANNOT_BID_REASON = {
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  NOT_VALIDATED: 'NOT_VALIDATED',
  ALREADY_WINNING: 'ALREADY_WINNING',
  ITEM_CLOSED: 'ITEM_CLOSED',
};

export const bidderStatus = (item, bidder) => {
  const isLoggedIn = bidder._id != null;
  const isWinning = item.currentBid.bidderId === bidder._id;
  const isInterested = !isWinning
  && item.bids.find((b) => b.bidderId === bidder._id) != null;

  let cannotBidReason = null;
  if (item.isClosed) {
    cannotBidReason = CANNOT_BID_REASON.ITEM_CLOSED;
  } else if (!isLoggedIn) {
    cannotBidReason = CANNOT_BID_REASON.NOT_LOGGED_IN;
  } else if (!bidder.isValidated) {
    cannotBidReason = CANNOT_BID_REASON.NOT_VALIDATED;
  } else if (isWinning) {
    cannotBidReason = CANNOT_BID_REASON.ALREADY_WINNING;
  }

  return {
    isLoggedIn,
    isWinning,
    isInterested,
    canBid: cannotBidReason === null,
    cannotBidReason,
  };
};
