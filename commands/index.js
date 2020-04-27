const auctions = require('./auctions');
const items = require('./items');
const content = require('./content');
const reports = require('./reports');
const { mongoExecute } = require('./util');

module.exports = {
  commands: {
    ...auctions,
    ...items,
    ...content,
    ...reports,
  },

  mongoExecute,
};
