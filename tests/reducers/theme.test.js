import { darkTheme, browserPreferredTheme } from '../../src/theme';
import themeReducer from '../../src/reducers/theme';

describe("theme reducer", () => {
  it("should return the initial state", () => {
    expect(themeReducer(undefined, {})).toEqual(browserPreferredTheme);
  });

  it("should correctly handle CHANGE_THEME", () => {
    expect(
      themeReducer({}, {
        type: 'CHANGE_THEME',
        theme: darkTheme
      })
    ).toEqual(darkTheme);
  });
});
