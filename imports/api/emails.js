import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import Mustache from 'mustache';

import { Auctions } from './auctions';
import { formatCurrency } from '../util';

function sendEmail(subject, to, templateProperty, data) {
  if (!Meteor.isServer) {
    return;
  }

  const auction = Auctions.findOne({});
  const template = auction.content[templateProperty];
  const from = process.env.MAIL_FROM;

  const html = Mustache.render(template, {
    ...data,
    auctionTitle: auction.content.title,
    auctionUrl: Meteor.absoluteUrl(),
  });

  Email.send({
    subject: `${auction.content.title} - ${subject}`,
    to,
    from,
    html,
  });
}

function sendItemEmail(bidder, item, subject, templateProperty) {
  const to = bidder.emailAddress;

  const data = {
    itemId: item._id,
    itemTitle: item.content.title,
    itemUrl: `${Meteor.absoluteUrl()}items/${item._id}`,
    bidAmount: formatCurrency(item.currentBid.amount),
  };

  sendEmail(subject, to, templateProperty, data);
}

function bidReceived(bidder, item) {
  sendItemEmail(bidder, item, 'Bid Received', 'bidReceivedEmail');
}

function outbid(bidder, item) {
  sendItemEmail(bidder, item, 'You\'ve Been Outbid', 'outbidEmail');
}

function validate(bidder) {
  const to = bidder.emailAddress;

  const data = {
    validateUrl: `${Meteor.absoluteUrl()}validate/${bidder.validationCode}`,
  };

  sendEmail('Validate Your E-mail Address', to, 'validateEmail', data);
}

export default { bidReceived, outbid, validate };
