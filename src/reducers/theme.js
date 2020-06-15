import { browserPreferredTheme } from '../theme';

export default function themeReducer(state = { theme: browserPreferredTheme }, action) {
  switch (action.type) {
    case 'CHANGE_THEME':
      return { theme: action.theme };
    default:
      return state;
  }
}
