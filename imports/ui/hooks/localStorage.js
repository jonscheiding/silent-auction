import { useContext, createContext } from 'react';

export const LocalStorageFacade = createContext();

export const useLocalBidderEmail = () => {
  const accessor = useContext(LocalStorageFacade);

  if (accessor == null) {
    //
    // Default accessor mimicking the return signature
    // of the useLocalStorage hook
    //
    return [null, () => {}, () => {}];
  }

  return accessor('bidder.email');
};
