/* eslint-disable no-console */
const { exec } = require('child_process');
const { MongoClient } = require('mongodb');

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

module.exports = { mongoExecute };
