import { Meteor } from 'meteor/meteor';
import React from 'react';
import Button from 'react-bootstrap/Button';

import { useLocalBidderInformation } from '../hooks/meteor';
import { useToasts } from '../hooks/toasts';
import { useRouter } from '../hooks/router';

export const ResendValidationLink = ({ children }) => {
  const bidder = useLocalBidderInformation();
  const { addToast } = useToasts();
  const { navigate } = useRouter();

  const handleHelpClick = () =>
    navigate.validationHelp();

  const handleResendClick = () => {
    Meteor.call('bidders.resendValidation', bidder._id);

    if (bidder.validationResendCount >= 3) {
      addToast({
        content: (
          <Button onClick={handleHelpClick} variant="link">
            Having trouble? Click here.
          </Button>
        ),
      });
    } else {
      addToast({
        content: 'We\'re sending you another validation email!',
      });
    }
  };

  return (
    <Button onClick={handleResendClick} variant="link">
      {children}
    </Button>
  );
};
