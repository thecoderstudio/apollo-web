import { login, logout } from '../../src/actions/auth';

test("login creates a login action", () => {
  const expectedAction = {
    type: 'LOGIN'
  };
  expect(login()).toEqual(expectedAction);
});

test("logout creates a logout action", () => {
  const expectedAction = {
    type: 'LOGOUT'
  };
  expect(logout()).toEqual(expectedAction);
});
