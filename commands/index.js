const auctions = require('./auctions');
const items = require('./items');
const content = require('./content');
const emails = require('./emails');
const reports = require('./reports');
const { mongoExecute } = require('./util');

module.exports = {
  commands: {
    ...auctions,
    ...items,
    ...content,
    ...emails,
    ...reports,
  },

  mongoExecute,
};
