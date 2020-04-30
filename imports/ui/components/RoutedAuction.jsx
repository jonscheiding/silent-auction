import React from 'react';

import { useRouter } from '../hooks/router';
import { useItems, useLocalBidderInformation, useCurrentAuction } from '../hooks/meteor';
import { Auction } from './Auction';

export const RoutedAuction = () => {
  const router = useRouter();
  const items = useItems();
  const bidder = useLocalBidderInformation();
  const auction = useCurrentAuction();

  const handleSelectItem = (item) => router.navigate.item(item._id);
  const handleDeselectItem = () => router.navigate.main();

  const { selectedItemId } = router.params;

  const handleNavigateItem = (direction) => {
    let selectedItemIndex = items.findIndex((i) => i._id === selectedItemId);
    selectedItemIndex += direction;

    if (selectedItemIndex < 0) {
      selectedItemIndex = items.length + selectedItemIndex;
    } else if (selectedItemIndex >= items.length) {
      selectedItemIndex -= items.length;
    }

    router.navigate.item(items[selectedItemIndex]._id);
  };

  return (
    <Auction
      items={items}
      bidder={bidder}
      auction={auction}
      selectedItemId={selectedItemId}
      onSelectItem={handleSelectItem}
      onDeselectItem={handleDeselectItem}
      onNavigateItem={handleNavigateItem}
    />
  );
};
