const path = require('path');
const fs = require('fs');
const Mustache = require('mustache');
const nodemailer = require('nodemailer');
const { RateLimiter } = require('limiter');

// eslint-disable-next-line no-unused-vars
const { Db } = require('mongodb');

const { report } = require('./reports');
const { addAuctionContent } = require('./util');
const { formatCurrency } = require('../imports/util');

module.exports = {
  /**
   * @param {Db} db
   */
  emails: async(db) => {
    const auction = addAuctionContent(await db
      .collection('auctions')
      .findOne({}));

    const template = fs.readFileSync(path.resolve(__dirname, 'email.mustache')).toString();

    const bids = await report.auction(db, false, true);

    const bidders = Array.from(new Set(bids.map((b) => b.bidder)));
    const mails = [];

    for (const bidder of bidders) {
      const items = bids
        .filter((b) => b.bidder === bidder && b.winner === 'YES')
        .map((item) => ({
          ...item,
          amount: formatCurrency(item.amount),
        }));

      if (items.length === 0) { continue; }

      const view = {
        bidder,
        auction: { title: auction.content.title },
        items,
        hasMedium: (medium) => items.find((i) => i.medium === medium) != null,
      };

      const html = Mustache.render(template, view);

      mails.push({
        from: 'jonscheiding+auction@gmail.com',
        to: 'jonscheiding+auction@gmail.com',
        bcc: bidder,
        subject: `${auction.content.title} - payment and delivery`,
        html,
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'jonscheiding@gmail.com',
        pass: 'rioxjpgtbeatizll',
      },
    });

    const limiter = new RateLimiter(1, 1000);

    for (const mail of mails) {
      limiter.removeTokens(1, () => {
        transporter.sendMail(mail);
      });
    }
  },
};
