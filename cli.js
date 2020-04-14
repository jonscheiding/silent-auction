const yargs = require('yargs');

const commands = require('./cli/commands');

// eslint-disable-next-line no-unused-expressions
yargs
  .command(
    'live start|stop',
    'Control the live auction.',
    (y) => y
      .positional('start|stop', {
        describe: 'Whether to start or stop the live auction.',
      }),
    (argv) => commands.live(argv.stop !== 'stop'),
  )

  .command(
    'active <itemId>|none',
    'Set an item as the current active item.',
    (y) => y
      .positional('<itemId>|none', {
        describe: 'The item to set as active, or "none" to clear the active item.',
        type: 'string',
      }),
    (argv) => commands.active(argv.itemId.toString()),
  )

  .command(
    'bidding <itemId> closed|open',
    'Sets bidding ability for an item.',
    (y) => y
      .positional('closed|open', {
        describe: 'Whether to set bidding as closed or open for the item.',
      })
      .positional('<itemId>', {
        describe: 'The item to set close-of-bidding.',
        type: 'string',
      }),
    (argv) => commands.bidding(argv.itemId.toString(), argv.closed === 'closed'),
  )

  .demandCommand()
  .strict()
  .help()
  .argv;
