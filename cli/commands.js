/* eslint-disable no-console */
const { mongoExecute } = require('./mongo');

module.exports = {
  live: (isLive) => mongoExecute(
    (db) => db
      .collection('auctions')
      .updateOne({}, { $set: { isLive } }),
  ),

  active: (itemId) => mongoExecute(
    async (db) => {
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
  ),

  bidding: (itemId, isClosed) => mongoExecute(
    async (db) => {
      const result = await db
        .collection('items')
        .updateOne({ _id: itemId }, { $set: { isClosed } });

      if (result.matchedCount !== 1) {
        throw new Error(`Item with id '${itemId}' was not found.`);
      }
    },
  ),
};
