const auctions = require('./auctions');
const items = require('./items');
const content = require('./content');
const { mongoExecute } = require('./mongo');

module.exports = {
  commands: {
    ...auctions,
    ...items,
    ...content,
  },

  mongoExecute,
};
