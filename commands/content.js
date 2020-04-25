/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const contentful = require('contentful');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const objectMapper = require('object-mapper');

function extractAssetUrl(value) {
  if (!value) { return null; }

  return value.fields.file.url;
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
  'fields.liveUrl': 'liveUrl',
};

const auctionItemMap = {
  'sys.id': 'reference',
  'fields.title': 'title',
  'fields.artist': 'artist',
  'fields.medium': 'medium',
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

    const auction = objectMapper(auctionEntry, auctionMap);

    const auctionItems = auctionItemEntries.items.map(
      (auctionItemEntry) => {
        try {
          return objectMapper(auctionItemEntry, auctionItemMap);
        } catch (e) {
          console.error(`Error mapping entry ${auctionItemEntry.sys.id}.`);
          console.error(JSON.stringify(auctionItemEntry, null, '  '));
          throw e;
        }
      },
    );

    const content = {
      auction,
      items: auctionItems,
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
