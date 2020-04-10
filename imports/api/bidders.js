import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Random } from 'meteor/random';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Bidders = new Mongo.Collection('bidders');

if (Meteor.isServer) {
  Meteor.publish('bidders.get', (emailAddress) => {
    check(emailAddress, Match.Maybe(String));
    return Bidders.find({ emailAddress });
  });
}

Meteor.methods({
  'bidders.login'(emailAddress) {
    check(emailAddress, String);

    const existingBidder = Bidders.findOne({ emailAddress });

    if (existingBidder) {
      return;
    }

    const validationCode = Random.hexString(16);

    Bidders.insert({
      emailAddress,
      validationCode,
      isValidated: false,
    });

    Email.send({
      to: emailAddress,
      from: process.env.MAIL_FROM,
      subject: 'MCP auction',
      text: `${Meteor.absoluteUrl()}validate/${validationCode}`,
    });
  },

  'bidders.validate'(validationCode) {
    check(validationCode, String);

    Bidders.update(
      { validationCode },
      {
        $set: { isValidated: true },
      },
    );
  },
});
