import { logout as logoutAction } from '../../src/actions/auth';
import { removeCurrentUser } from '../../src/actions/current-user';
import { logout } from '../../src/util/auth'
import { store } from '../../src/store';

test('logout', () => {
  const spy = jest.spyOn(store, 'dispatch');
  logout()
  expect(spy).toHaveBeenCalledWith(logoutAction());
  expect(spy).toHaveBeenCalledWith(removeCurrentUser());
});