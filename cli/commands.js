const auctionCommands = require('./commands.auction');
const contentCommands = require('./commands.content');

module.exports = {
  ...auctionCommands,
  ...contentCommands,
};
