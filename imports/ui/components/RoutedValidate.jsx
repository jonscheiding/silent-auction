import { Meteor } from 'meteor/meteor';

import { useToasts } from '../hooks/toasts';
import { useRouter } from '../hooks/router';

export const RoutedValidate = () => {
  const { addToast } = useToasts();

  const router = useRouter();
  const { validationCode } = router.params;

  Meteor.call('bidders.validate', validationCode);

  addToast({
    content: 'Thanks for validating your e-mail address!  Happy bidding!',
  });

  router.navigate.main();

  return null;
};
