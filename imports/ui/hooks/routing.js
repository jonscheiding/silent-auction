import { useHistory, useRouteMatch } from 'react-router';

export const useRouteItemId = () => {
  const history = useHistory();
  const match = useRouteMatch('/items/:itemId');

  let routeItemId = null;
  if (match !== null) {
    routeItemId = match.params.itemId;
  }

  const setRouteItemId = (itemId) => {
    if (itemId === null) {
      history.push('/');
    } else {
      history.push(`/items/${itemId}`);
    }
  };

  return [routeItemId, setRouteItemId];
};
