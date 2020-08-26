import { store } from '../store';
import { notify } from './notification';

function handleError(error, informUser=true) {
  if (!informUser) {
    return;
  }

  store.dispatch(notify(error, 'error'));
}

function handleHTTPResponse(response, informUser=true) {
  if(response.status >= 200 && response.status < 400) {
    return true;
  }

  handleError(response.statusText);
  return false;
}

export { handleError, handleHTTPResponse };
