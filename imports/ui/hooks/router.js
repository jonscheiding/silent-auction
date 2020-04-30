import { useHistory, useParams } from 'react-router-dom';

export const useRouter = () => {
  const params = useParams();
  const history = useHistory();

  return {
    params,
    navigate: {
      main: () => history.push('/'),
      live: () => history.push('/live'),
      item: (itemId) => history.push(`/items/${itemId}`),
      validationHelp: () => history.push('/validate/help'),
    },
  };
};
