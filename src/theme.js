export const darkTheme = {
  name: "dark",
  black: "#181818",
  lightBlack: "#1B1B1B",
  white: "#F8F8F8",
  darkWhite: "#F1F1F1",
  primary: "#02A3EE",
  accent: "#4D02EE",
  error: "#ED3E2A"
};

function getBrowserPreferredTheme() {
  return darkTheme;
}

export const browserPreferredTheme = getBrowserPreferredTheme();
