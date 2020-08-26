import { Map } from 'immutable';
import rootReducer from '../../src/reducers/root';
import { darkTheme } from '../../src/theme';

test("root reducer should contain all reducers", () => {
  expect(rootReducer(undefined, {})).toEqual({
    agent: [],
    authenticated: false,
    currentUser: {},
    notifications: Map({}),
    theme: darkTheme
  });
});
