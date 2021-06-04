/* eslint-disable no-console */
const util = require('util');
const stringify = util.promisify(require('csv-stringify'));

// eslint-disable-next-line no-unused-vars
const { Db } = require('mongodb');

const { addItemContent } = require('./util');
const { formatCurrency, byArtistAndTitle, byEmail } = require('../imports/util');

const commands = {
  report: {
    /**
     * @param {Db} db
     */
    items: async (db) => {
      const items = await db
        .collection('items')
        .find({})
        .map(addItemContent)
        .toArray();

      const itemsData = items
        .filter((item) => item.content != null)
        .map((item) => ({
          id: item._id,
          title: item.content.title,
          artist: item.content.artist,
          bid: item.bids.length === 0 ? 0 : item.bids[0].amount,
        }));

      console.log(await stringify(itemsData));
    },

    /**
     * @param {Db} db
     */
    bidders: async (db) => {
      const currentBidderIds = await db
        .collection('items')
        .find({ 'bids.0': { $exists: true } })
        .map((i) => i.bids[0].bidderId)
        .toArray();

      const bidders = await db
        .collection('bidders')
        .find({ _id: { $in: currentBidderIds } })
        .toArray();

      for (const bidder of bidders) {
        console.info(bidder.emailAddress);
      }
    },

    /**
     * @param {Db} db
     */
    auction: async (db, csv, json) => {
      const bidders = await db
        .collection('bidders')
        .find({})
        .toArray();

      const items = await db
        .collection('items')
        .find({})
        .map(addItemContent)
        .toArray();

      if (csv || json) {
        const bids = [];

        for (const item of items) {
          for (const bid of item.bids) {
            const bidder = bidders.find((b) => b._id === bid.bidderId);

            bids.push({
              title: item.content.title,
              artist: item.content.artist,
              medium: item.content.medium,
              bidder: bidder.emailAddress,
              amount: bid.amount,
              winner: bid === item.bids[0] ? 'YES' : 'NO',
            });
          }
        }

        if (csv) {
          console.log(await stringify(bids, { header: true }));
        }

        return bids;
      }

      let total = 0;

      for (const bidder of bidders.sort(byEmail)) {
        console.info(bidder.emailAddress, bidder.isValidated ? '' : '(not validated)');

        for (const item of items) {
          for (const bid of item.bids.filter((b) => b.bidderId === bidder._id)) {
            if (!item.content) {
              console.warn(`Missing content for item with ID '${item._id}'.`);
              // eslint-disable-next-line no-continue
              continue;
            }

            console.info(
              `  ${item.content.title} - ${formatCurrency(bid.amount)}`,
              bid === item.bids[0] ? '(winning)' : '',
            );
          }
        }
      }

      console.info();

      for (const item of items
        .filter((i) => i.content != null)
        .sort(byArtistAndTitle)) {
        console.info(`${item.content.title} - ${item.content.artist}`);

        if (item.bids.length > 0) {
          total += item.bids[0].amount;
        }

        for (const bid of item.bids) {
          const bidder = bidders.find((b) => b._id === bid.bidderId);
          console.info(`  ${bidder.emailAddress} - ${formatCurrency(bid.amount)}`);
        }
      }

      console.info();
      console.info(`TOTAL: ${formatCurrency(total)}`);
      return null;
    },
  },
};

module.exports = commands;
