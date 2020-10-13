import axios from 'axios';
import { handleHTTPResponse } from '../actions/error';
import { cacheCurrentUser } from '../actions/current-user';
import { store } from '../store';

export function fetchCurrentUser(callback) {
  axios.get(
    `${process.env.APOLLO_HTTP_URL}user/me`,
    { withCredentials: true }
  )
  .then(res => {
    store.dispatch(cacheCurrentUser(res.data));
    if (callback) {
      callback();
    }
  })
  .catch(error => {
    handleHTTPResponse(error.response);
  });
}
