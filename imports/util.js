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
  AUCTION_NOT_STARTED: 'AUCTION_NOT_STARTED',
  AUCTION_ENDED: 'AUCTION_ENDED',
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  NOT_VALIDATED: 'NOT_VALIDATED',
  ALREADY_WINNING: 'ALREADY_WINNING',
  ITEM_CLOSED: 'ITEM_CLOSED',
};

export const bidderStatus = (item, bidder, auction) => {
  const isLoggedIn = bidder._id != null;
  const isWinning = bidder._id != null && item.currentBid.bidderId === bidder._id;
  const isInterested = !isWinning
  && item.bids.find((b) => b.bidderId === bidder._id) != null;

  const isSold = item.currentBid.amount > 0 && (item.isClosed || auction.isEnded);

  let cannotBidReason = null;
  if (!auction.isStarted) {
    cannotBidReason = CANNOT_BID_REASON.AUCTION_NOT_STARTED;
  } else if (auction.isEnded) {
    cannotBidReason = CANNOT_BID_REASON.AUCTION_ENDED;
  } else if (item.isClosed) {
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
    isSold,
    isClosed: item.isClosed || auction.isEnded,
    canBid: cannotBidReason === null,
    cannotBidReason,
  };
};
