const auction = require('./auction');
const content = require('./content');
const { mongoExecute } = require('./mongo');

module.exports = {
  commands: {
    ...auction,
    ...content,
  },

  mongoExecute,
};
