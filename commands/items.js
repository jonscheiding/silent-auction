/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const util = require('util');
const stringify = util.promisify(require('csv-stringify'));

// eslint-disable-next-line no-unused-vars
const { Db } = require('mongodb');

const commands = {
  order: (db, itemIds) => db
    .collection('auctions')
    .updateOne({}, { $set: { orderedItemIds: itemIds } }),

  /**
   * @param {Db} db
   */
  listItems: async (db) => {
    const items = await db
      .collection('items')
      .find({})
      .toArray();

    const contentFullPath = path.resolve('./content.json');
    const content = JSON.parse(fs.readFileSync(contentFullPath));

    const itemsData = items
      .map((item) => {
        const itemContent = content.items.find((i) => i.reference === item.reference)
      || {};

        return {
          id: item._id,
          title: itemContent.title,
          artist: itemContent.artist,
        };
      })
      .filter((item) => item.title != null);

    console.log(await stringify(itemsData));
  },

  next: async (db) => {
    const auction = await db
      .collection('auctions')
      .findOne({});

    if (!auction.orderedItemIds) {
      throw new Error('No item ID order has been set for the auction.  Call the "order" command first.');
    }

    try {
      await commands.bidding(db, 'active', true);
    } catch (e) {
      console.warn(e.message);
    }

    if (auction.orderedItemIds.length === 0) {
      console.info('No more items in auction order.  Clearing the active item.');
      await commands.active(db, 'none');
      await db
        .collection('auctions')
        .updateOne({}, { $unset: { orderedItemIds: 1 } });
      return;
    }

    const activeItemId = auction.orderedItemIds[0];

    await db
      .collection('auctions')
      .updateOne({}, { $pop: { orderedItemIds: -1 } });

    try {
      await commands.active(db, activeItemId);
    } catch (e) {
      console.warn(e.message);
      console.warn('Item has been skipped');
      await commands.next(db);
    }
  },

  active: async (db, itemId) => {
    let activeItemId;

    if (itemId === 'none') {
      activeItemId = null;
    } else {
      const item = await db.collection('items').findOne({ _id: itemId });
      if (!item) {
        throw new Error(`Item with id '${itemId}' was not found.`);
      }

      activeItemId = item._id;
    }

    await db
      .collection('auctions')
      .updateOne({}, { $set: { activeItemId } });
  },

  bidding: async (db, itemId, isClosed) => {
    if (itemId === 'active') {
      const auction = await db
        .collection('auctions')
        .findOne({});

      if (!auction.activeItemId) {
        throw new Error('The auction has no active item.');
      }

      // eslint-disable-next-line no-param-reassign
      itemId = auction.activeItemId;
    }

    const query = {};
    if (itemId !== 'all') {
      query._id = itemId;
    }

    const result = await db
      .collection('items')
      .updateMany(query, { $set: { isClosed } });

    if (query._id && result.matchedCount !== 1) {
      throw new Error(`Item with id '${itemId}' was not found.`);
    }
  },
};

module.exports = commands;
