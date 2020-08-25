export const darkTheme = {
  name: "dark",
  black: "#181818",
  lightBlack: "#1B1B1B",
  white: "#F8F8F8",
  darkWhite: "#F1F1F1",
  darkGrey: "#3E3E3E",
  primary: "#02A3EE",
  accent: "#4D02EE",
  connectedColor: "#27AE60",
  disconnectedColor: "#C0392B",
  connectingColor: "#F39C12",
  error: "#ED3E2A"
};

function getBrowserPreferredTheme() {
  return darkTheme;
}

export const browserPreferredTheme = getBrowserPreferredTheme();
