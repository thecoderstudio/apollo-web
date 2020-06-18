import Cookies from 'js-cookie';
import authReducer from '../../src/reducers/auth';

describe("auth reducer", () => {
  it("should return false as initial state", () => {
    expect(authReducer(undefined, {})).toEqual(false);
  });

  it("should correctly handle LOGIN", () => {
    Cookies.set('session', 'test', { path: '/' });
    expect(authReducer({}, { type: 'LOGIN' })).toEqual(true);
  });

  it("should correctly handle LOGOUT", () => {
    Cookies.set('session', 'test', { path: '/' });
    expect(authReducer({}, { type: 'LOGOUT' })).toEqual(false);
  });
});
