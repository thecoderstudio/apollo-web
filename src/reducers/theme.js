import { browserPreferredTheme } from '../theme';

export default function themeReducer(state = browserPreferredTheme, action) {
  switch (action.type) {
    case 'CHANGE_THEME':
      return action.theme;
    default:
      return state;
  }
}
