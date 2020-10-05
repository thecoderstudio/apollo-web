import { store } from '../store';
import { logout as logoutAction } from '../actions/auth';
import { removeCurrentUser } from '../actions/current-user';

export function logout() {
  store.dispatch(logoutAction());
  store.dispatch(removeCurrentUser());
}
