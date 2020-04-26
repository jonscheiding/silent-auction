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
  const { activeItemId } = auction;

  if (activeItemId != null && selectedItemId != null) {
    router.navigate.main();
  }

  return (
    <Auction
      items={items}
      bidder={bidder}
      auction={auction}
      selectedItemId={activeItemId || selectedItemId}
      onSelectItem={activeItemId == null ? handleSelectItem : null}
      onDeselectItem={activeItemId == null ? handleDeselectItem : null}
    />
  );
};
