import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useHistory, useParams } from 'react-router';

export const Validate = ({ validationCode, onValidated }) => {
  Meteor.call('bidders.validate', validationCode);

  setTimeout(onValidated, 1000);

  return (
    <p>Validating your e-mail address.</p>
  );
};

Validate.WithRouter = () => {
  const history = useHistory();
  const { validationCode } = useParams();

  const onValidated = () => history.push('/');

  return <Validate validationCode={validationCode} onValidated={onValidated} />;
};
