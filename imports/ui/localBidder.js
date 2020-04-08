import React, {
  createContext, useContext, useState, useEffect,
} from 'react';

export const BidderEmailContext = createContext();

const initialBidderEmail = localStorage.getItem('bidder.email');

export const BidderEmailProvider = ({ children }) => {
  const [bidderEmail, setBidderEmail] = useState(initialBidderEmail);

  useEffect(() => localStorage.setItem('bidder.email', bidderEmail));

  return (
    <BidderEmailContext.Provider value={[bidderEmail, setBidderEmail]}>
      {children}
    </BidderEmailContext.Provider>
  );
};

export const useBidderEmail = () => useContext(BidderEmailContext);
