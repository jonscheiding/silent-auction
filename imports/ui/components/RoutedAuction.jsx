import React from 'react';

import { useRouter } from '../hooks/router';
import { useItems, useLocalBidderInformation } from '../hooks/meteor';
import { Auction } from './Auction';

export const RoutedAuction = () => {
  const router = useRouter();
  const items = useItems();
  const bidder = useLocalBidderInformation();

  const handleSelectItem = (item) => router.navigate.item(item._id);
  const handleDeselectItem = () => router.navigate.main();

  const { selectedItemId } = router.params;

  return (
    <Auction
      items={items}
      bidder={bidder}
      selectedItemId={selectedItemId}
      onSelectItem={handleSelectItem}
      onDeselectItem={handleDeselectItem}
    />
  );
};
