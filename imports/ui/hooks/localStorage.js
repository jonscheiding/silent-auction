import { useLocalStorage } from '@rehooks/local-storage';

export const useLocalBidderEmail = () => useLocalStorage('bidder.email', null);
