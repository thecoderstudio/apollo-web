import axios from 'axios';
import { handleHTTPResponse } from '../actions/error'; 

function fetchCurrentUser(dispatch) {
  console.log("((()))")
  axios.get(
    `${process.env.APOLLO_HTTP_URL}user/me`,
    { withCredentials: true }
  )
    .then(res => {
      console.log(res);
      dispatch(cacheCurrentUser(res.data));
    })
    .catch(error => {
      handleHTTPResponse(error.response);
    });
}

export { fetchCurrentUser };
