import { PROMPTED_PASSWORD_CHANGE } from '../actions/change-password';

export default function changePasswordReducer(state=false, action) {
  switch(action.type) {
    case PROMPTED_PASSWORD_CHANGE:
      return true;
    default: return state;
  }
}
