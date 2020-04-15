import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useToasts } from '../hooks/toasts';

export const Validate = ({ validationCode, onValidated }) => {
  const { addToast } = useToasts();

  Meteor.call('bidders.validate', validationCode);

  addToast({
    content: 'Thanks for validating your e-mail address!  Happy bidding!',
  });

  onValidated();

  return null;
};

Validate.WithRouter = () => {
  const history = useHistory();
  const { validationCode } = useParams();

  const onValidated = () => history.push('/');

  return <Validate validationCode={validationCode} onValidated={onValidated} />;
};
