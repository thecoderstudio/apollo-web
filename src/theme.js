export const darkTheme = {
  name: "dark",
  black: "#181818",
  lightBlack: "#1B1B1B",
  white: "#F8F8F8",
  primary: "#02A3EE",
  accent: "#4D02EE",
  connected_color: "#27AE60",
  disconnected_color: "#C0392B",
  connecting_color: "#F39C12",
};

function getBrowserPreferredTheme() {
  return darkTheme;
}

export const browserPreferredTheme = getBrowserPreferredTheme();
