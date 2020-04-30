/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const contentful = require('contentful');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const objectMapper = require('object-mapper');

// eslint-disable-next-line no-unused-vars
const { Db } = require('mongodb');

function extractAssetUrl(value) {
  if (!value) { return null; }

  return value.fields.file.url;
}

/**
 * @param {contentful.EntryCollection} entries
 * @param {*} map
 */
function mapItems(entries, map) {
  return entries.items.map((entry) => {
    try {
      return objectMapper(entry, map);
    } catch (e) {
      console.error(`Error mapping entry ${entry.sys.id}.`);
      console.error(JSON.stringify(entry, null, '  '));
      throw e;
    }
  });
}

const auctionMap = {
  'sys.id': 'reference',
  'fields.title': 'title',
  'fields.welcomeMessage': {
    key: 'welcomeMessage',
    transform: documentToHtmlString,
  },
  'fields.notStartedMessage': {
    key: 'notStartedMessage',
    transform: documentToHtmlString,
  },
  'fields.endedMessage': {
    key: 'endedMessage',
    transform: documentToHtmlString,
  },
  'fields.validationHelpMessage': {
    key: 'validationHelpMessage',
    transform: documentToHtmlString,
  },
  'fields.liveMessage': {
    key: 'liveMessage',
    transform: documentToHtmlString,
  },
  'fields.bidReceivedEmail': {
    key: 'bidReceivedEmail',
    transform: documentToHtmlString,
  },
  'fields.outbidEmail': {
    key: 'outbidEmail',
    transform: documentToHtmlString,
  },
  'fields.validateEmail': {
    key: 'validateEmail',
    transform: documentToHtmlString,
  },
};

const auctionOrderMap = {
  'sys.id': 'reference',
  'fields.name': 'name',
  'fields.auctionItems[]': {
    key: 'references[]',
    transform: (value) => value.sys.id,
  },
};

const auctionItemMap = {
  'sys.id': 'reference',
  'fields.title': 'title',
  'fields.artist': 'artist',
  'fields.medium': 'medium',
  'fields.category': 'category',
  'fields.fullImage': {
    key: 'fullImageUrl',
    transform: extractAssetUrl,
  },
  'fields.previewImage': {
    key: 'previewImageUrl',
    transform: extractAssetUrl,
  },
  'fields.videoId': 'videoId',
  'fields.description': {
    key: 'description',
    transform: documentToHtmlString,
  },
};

const commands = {
  /**
   * @param {Db} db
   */
  resetDb: async (db, auctionId) => {
    const auction = await db.collection('auctions').findOne({});
    if (auction._id !== auctionId) {
      console.warn(`Run with --auctionId ${auction._id} to confirm you want to reset all bids and statuses.`);
      return;
    }

    await db
      .collection('bidders')
      .deleteMany({});

    await db
      .collection('items')
      .updateMany({}, {
        $set: {
          bids: [],
          isClosed: false,
        },
      });

    await db
      .collection('auctions')
      .updateMany({}, {
        $set: {
          isLive: false,
          activeItemId: null,
          isEnded: false,
          isStarted: false,
        },
      });
  },

  refreshContent: async ({ verbose }) => {
    const client = contentful.createClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      space: process.env.CONTENTFUL_SPACE_ID,
      host: process.env.CONTENTFUL_HOST,
    });

    console.info('Connected to Contentful; retrieving content.');

    const auctionEntry = await client.getEntry(process.env.CONTENTFUL_AUCTION_ENTRY_ID);

    const auctionItemEntries = await client.getEntries({
      content_type: 'auctionItem',
      'fields.auction.sys.id': process.env.CONTENTFUL_AUCTION_ENTRY_ID,
    });

    const auctionOrderEntries = await client.getEntries({
      content_type: 'auctionOrder',
      'fields.auction.sys.id': process.env.CONTENTFUL_AUCTION_ENTRY_ID,
    });

    const auction = objectMapper(auctionEntry, auctionMap);
    const auctionItems = mapItems(auctionItemEntries, auctionItemMap);
    const auctionOrders = mapItems(auctionOrderEntries, auctionOrderMap);

    for (const order of auctionOrders) {
      order.references = order.references.filter((r) => {
        if (auctionItems.find((i) => i.reference === r) == null) {
          console.warn(`Auction order '${order.reference}' references item '${r}' that is not part of the auction.`);
          return false;
        }

        return true;
      });
    }

    const content = {
      auction,
      items: auctionItems,
      orders: auctionOrders,
    };

    const contentFullPath = path.resolve('./content.json');
    const contentJson = JSON.stringify(content, null, '  ');

    fs.writeFileSync(contentFullPath, contentJson);

    console.info(`Auction retrieved with ${auctionItems.length} items.  Saved to ${contentFullPath}.`);

    if (verbose) {
      console.debug(contentJson);
    }
  },
};

module.exports = commands;
