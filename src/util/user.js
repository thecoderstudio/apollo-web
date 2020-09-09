import axios from 'axios';
import { handleHTTPResponse } from '../actions/error'; 
import { cacheCurrentUser } from '../actions/current-user';

function fetchCurrentUser(dispatch) {
  axios.get(
    `${process.env.APOLLO_HTTP_URL}user/me`,
    { withCredentials: true }
  )
    .then(res => {
      dispatch(cacheCurrentUser(res.data));
    })
    .catch(error => {
      handleHTTPResponse(error.response);
    });
}

export { fetchCurrentUser };
