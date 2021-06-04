/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { MongoClient } = require('mongodb');

let content;

function ensureContentLoaded() {
  if (content != null) { return; }

  const contentFullPath = path.resolve('./content.json');
  content = JSON.parse(fs.readFileSync(contentFullPath));
}

function getContent() {
  ensureContentLoaded();

  return content;
}

function addItemContent(item) {
  ensureContentLoaded();

  const itemContent = content.items.find((i) => i.reference === item.reference);
  if (itemContent == null) { return item; }

  return {
    ...item,
    content: itemContent,
  };
}

function addAuctionContent(auction) {
  ensureContentLoaded();

  const auctionContent = content.auction;
  if (auctionContent == null) { return auction; }

  return {
    ...auction,
    content: auctionContent,
  };
}

function mongoUrl() {
  if (process.env.MONGO_URL) {
    return Promise.resolve(process.env.MONGO_URL);
  }

  const childProcess = exec('meteor mongo --url');

  let stdout = '';

  childProcess.stdout.on('data', (data) => { stdout += data; });
  childProcess.stderr.on('data', console.error);

  return new Promise((resolve, reject) => {
    childProcess.addListener('error', reject);
    childProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(stdout));
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function mongoExecute(callback) {
  const url = await mongoUrl();
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db();

  await callback(db);

  client.close();
}

module.exports = {
  mongoExecute, getContent, addItemContent, addAuctionContent,
};
