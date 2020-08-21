import { REMOVE_CURRENT_USER, CACHE_CURRENT_USER, removeCurrentUser, cacheCurrentUser } from '../../src/actions/current-user';

test("removeCurrentUser creates correct action", () => {
  const expectedAction = {
    type: REMOVE_CURRENT_USER
  };
  expect(removeCurrentUser()).toEqual(expectedAction);
});

test("cacheCurrentUser creates correct action", () => {
  const expectedAction = {
    type: CACHE_CURRENT_USER,
    user: { test: 'test' }
  };
  expect(cacheCurrentUser({ test: 'test' })).toEqual(expectedAction);
});
