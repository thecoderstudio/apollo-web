export const darkTheme = {
  name: "dark",
  black: "#181818",
  lightBlack: "#1B1B1B",
  white: "#F8F8F8",
  primary: "#02A3EE",
  accent: "#4D02EE"
};

function getBrowserPreferredTheme() {
  return darkTheme;
}

export const browserPreferredTheme = getBrowserPreferredTheme();
