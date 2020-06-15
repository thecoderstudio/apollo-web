export const darkTheme = {
  name: "dark",
  black: "#181818",
  lightBlack: "#1B1B1B",
  white: "#F8F8F8",
  primary: "#02CCEE",
  accent: "#EE2502"
};

function getBrowserPreferredTheme() {
  return darkTheme;
}

export const browserPreferredTheme = getBrowserPreferredTheme();
