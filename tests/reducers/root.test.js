import rootReducer from '../../src/reducers/root';
import { darkTheme } from '../../src/theme';

test("root reducer should contain all reducers", () => {
  expect(rootReducer(undefined, {})).toEqual({
    auth: {
      authenticated: false
    },
    theme: {
      theme: darkTheme
    }
  });
})