const yargs = require('yargs');

const commands = require('./cli/commands');
const { mongoExecute } = require('./cli/mongo');

function command(fn, ...args) {
  return mongoExecute((db) => fn.call(null, db, ...args));
}

// eslint-disable-next-line no-unused-expressions
yargs
  .command(
    'live start|stop',
    'Control the live auction.',
    (y) => y
      .positional('start|stop', {
        describe: 'Whether to start or stop the live auction.',
      }),
    (argv) => command(commands.live, argv.stop !== 'stop'),
  )

  .command(
    'order <itemIds...>',
    'Set the order of items for the live auction.',
    (y) => y
      .positional('itemIds', {
        describe: 'The IDs (in order) of the items to auction.',
      }),
    (argv) => command(commands.order, argv.itemIds),
  )

  .command(
    'active <itemId>|none|next',
    'Set an item as the current active item.',
    (y) => y
      .positional('<itemId>|none|next', {
        describe: 'The item to set as active, "next" to use the next item set by the order command, or "none" to clear the active item.',
        type: 'string',
      }),
    (argv) => {
      if (argv.itemId === 'next') {
        return command(commands.next);
      }
      return command(commands.active, argv.itemId.toString());
    },
  )

  .command(
    'bidding <itemId>|active closed|open',
    'Sets bidding ability for an item.',
    (y) => y
      .positional('closed|open', {
        describe: 'Whether to set bidding as closed or open for the item.',
      })
      .positional('<itemId>|active|all', {
        describe: 'The item to set close-of-bidding, "all" to set for all items, or "active" to use the current active item.',
        type: 'string',
      }),
    (argv) => command(commands.bidding, argv.itemId.toString(), argv.closed === 'closed'),
  )

  .command(
    'update-content',
    'Downloads updated content from Contentful for auction.',
    (y) => y
      .option('verbose', {
        describe: 'Output the retrieved content JSON to the console.',
      }),
    commands.updateContent,
  )

  .demandCommand()
  .strict()
  .help()
  .argv;
