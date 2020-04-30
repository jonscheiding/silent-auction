const commands = {
  auction: (db, status, argv) => {
    const set = { };

    switch (status) {
      case 'started':
        set.isStarted = true;
        set.isLive = false;
        set.isEnded = false;
        set.liveVideoId = null;
        break;

      case 'ended':
        set.isStarted = true;
        set.isLive = false;
        set.isEnded = true;
        set.liveVideoId = null;
        break;

      case 'live':
        set.isStarted = true;
        set.isLive = true;
        set.isEnded = false;

        set.liveVideoId = argv.videoId;

        break;

      case 'preview':
        set.isStarted = false;
        set.isLive = false;
        set.isEnded = false;
        set.liveVideoId = null;
        break;

      default:
        throw new Error(`Unknown status: '${status}'`);
    }

    return db.collection('auctions').updateOne({}, { $set: set });
  },

};

module.exports = commands;
