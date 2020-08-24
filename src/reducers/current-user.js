import { CACHE_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/current-user';

export default function currentUserReducer(state={}, action) {
  switch(action.type) {
    case CACHE_CURRENT_USER:
      return action.user;
    case REMOVE_CURRENT_USER:
      return {};
    default:
      return state;
  }
}
