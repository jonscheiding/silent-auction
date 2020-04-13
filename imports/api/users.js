import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.users.deny({
  update() { return true; },
});

Meteor.methods({
  'users.login'(emailAddress) {
    check(emailAddress, String);

    Accounts.callLoginMethod({
      methodArguments: [{ emailAddress }],
    });
  },
});

Meteor.loginWithEmail = (emailAddress) => {
  check(emailAddress, String);

  Accounts.callLoginMethod({
    methodArguments: [{ emailAddress }],
  });
};
