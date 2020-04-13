import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/bidders';
import '../imports/api/bids';
import '../imports/api/users';

Accounts.registerLoginHandler('email-login', (loginRequest) => {
  if (!loginRequest.emailAddress) {
    return undefined;
  }

  const user = Meteor.users.findOne({ username: loginRequest.emailAddress });
  let userId;

  if (user) {
    userId = user._id;
  } else {
    userId = Accounts.createUser({
      username: loginRequest.emailAddress,
      email: loginRequest.emailAddress,
    });
  }

  return {
    id: userId,
  };
});
