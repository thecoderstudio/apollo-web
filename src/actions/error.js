import { StatusCodes } from 'http-status-codes';
import { store } from '../store';
import { severity, notify as notifyAction } from './notification';

function handleError(error, notify=true) {
  if (!notify) {
    return;
  }

  store.dispatch(notifyAction(error, severity.ERROR));
}

function handleHTTPResponse(response, notify=true, allowBadRequests=false) {
  if(response.status >= 200 && response.status < 400) {
    return true;
  } else if (response.status === StatusCodes.BAD_REQUEST && allowBadRequests) {
    // The bad request won't be treated as an error but it isn't a successful response either.
    return false;
  }
  const message = response.detail ? response.detail : response.statusText;
  handleError(message, notify);
  return false;
}

export { handleError, handleHTTPResponse };
