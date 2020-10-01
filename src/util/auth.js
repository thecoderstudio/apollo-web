import { store } from '../store';
import { logout } from '../actions/auth';
import { removeCurrentUser } from '../actions/current-user';

export function logout() {
  store.dispatch(logout());
  store.dispatch(removeCurrentUser());
}
