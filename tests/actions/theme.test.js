import { darkTheme } from '../../src/theme';
import { changeTheme } from '../../src/actions/theme';

test("changeTheme creates an action to change the theme", () => {
  const expectedTheme = darkTheme;
  const expectedAction = {
    type: 'CHANGE_THEME',
    theme: expectedTheme
  }
  expect(changeTheme(expectedTheme)).toEqual(expectedAction);
});
