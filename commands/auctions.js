const commands = {
  auction: (db, status) => {
    const set = { };

    switch (status) {
      case 'started':
        set.isStarted = true;
        set.isLive = false;
        set.isEnded = false;
        break;

      case 'ended':
        set.isStarted = true;
        set.isLive = false;
        set.isEnded = true;
        break;

      case 'live':
        set.isStarted = true;
        set.isLive = true;
        set.isEnded = false;
        break;

      case 'preview':
        set.isStarted = false;
        set.isLive = false;
        set.isEnded = false;
        break;

      default:
        throw new Error(`Unknown status: '${status}'`);
    }

    return db.collection('auctions').updateOne({}, { $set: set });
  },

};

module.exports = commands;
