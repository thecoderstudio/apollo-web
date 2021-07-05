export const darkTheme = {
  name: 'dark',
  black: '#181818',
  lightBlack: '#1B1B1B',
  InputBlack: '#1f1f1f',
  selectedBlack: '#252525',
  white: '#F8F8F8',
  inactive: '#363636',
  darkWhite: '#F1F1F1',
  darkGrey: '#3E3E3E',
  primary: '#02A3EE',
  accent: '#4D02EE',
  overlay: 'rgba(37, 37, 37, 0.6)',
  green: '#32E67E',
  red: '#ED3E2A',
  connectedColor: '#27AE60',
  disconnectedColor: '#C0392B',
  connectingColor: '#F39C12',
  success: '#27AE60',
  error: '#ED3E2A',
  warning: '#ED852A',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  smallTextSize: '0.85rem'
};

function getBrowserPreferredTheme() {
  return darkTheme;
}

export const browserPreferredTheme = getBrowserPreferredTheme();
