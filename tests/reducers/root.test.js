import { Map } from 'immutable';
import rootReducer from '../../src/reducers/root';
import { darkTheme } from '../../src/theme';

test("root reducer should contain all reducers", () => {
  expect(rootReducer(undefined, {})).toEqual({
    agent: new Map(),
    authenticated: false,
    currentUser: {},
    notifications: new Map({}),
    theme: darkTheme
  });
});
