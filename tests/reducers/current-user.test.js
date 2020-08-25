import { cacheCurrentUser, removeCurrentUser } from '../../src/actions/current-user';
import currentUserReducer from '../../src/reducers/current-user';

describe("current user reducer", () => {
  it("should return empty as initial state", () => {
    expect(currentUserReducer(undefined, {})).toEqual({})
  });

  it("should correctly CACHE_CURRENT_USER", () => {
    const user = {
      name: 'test'
    };
    expect(currentUserReducer({}, cacheCurrentUser(user))).toEqual(user);
  });

it("should correctly REMOVE_CURRENT_USER", () => {
    const user = {
      name: 'test'
    };
    expect(currentUserReducer(user, removeCurrentUser())).toEqual({});
  });
});
