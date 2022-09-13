import { getPaletteWithContrast, getReversePalette } from "./utils";

/**
 * Brand's Colors
 *
 * #F73859 primary
 * #7AC7C4 secondary
 * #C4EDDE secondary 2
 * #384259 accent
 *
 */

const brandColors = {
  primary: getPaletteWithContrast("brandPrimary", "#F73859"),
  secondary: getPaletteWithContrast("brandSecondary", "#63AE9D"),
  accent: getPaletteWithContrast("brandAccent", "#384259"),
};

// console.log(getPaletteWithContrast("brandAccent", "#E24939"))
// console.log(getPaletteWithContrast("brandAccent", "#EB7084"))

const basicColors = {
  red: getPaletteWithContrast("red", "#E24939"),
  green: getPaletteWithContrast("green", "#7cd9b8"),
  blue: getPaletteWithContrast("blue", "#0000ff"),
  violet: getPaletteWithContrast("violet", "#7f00ff"),
  yellow: getPaletteWithContrast("yellow", "#ffff00"),
  orange: getPaletteWithContrast("orange", "#ffa500"),
};

// dark #26242b

export const staticCustomColors = {
  transparent: "rgba(0,0,0,0)",
  background: "#ffffff",
  backgroundOverlay: "#FBFBFB",
  white: "#ffffff",
  black: "#000000",

  //grays
  lightGray: "hsl(300,1%, 90%)",
  gray: "hsl(300,1%, 50%)",
  darkGray: "hsl(300,1%, 10%)",

  text: "rgba(0,0,0,0.87)",
  subText: "rgba(0,0,0,0.60)",
  disabledText: "rgba(0,0,0,0.38)",

  success: "#28a745",
  pending: "#e0c01f",
  failed: "#dc3545",

  inputBackground: "rgb(218,226,226)",

  staticLightBackground: "#f0f9f8",
  staticDarkBackground: "#356E6E",
};

export const palettes = {
  ...brandColors.primary,
  ...brandColors.secondary,
  ...brandColors.accent,
  ...basicColors.red,
  ...basicColors.green,
  ...basicColors.blue,
  ...basicColors.violet,
  ...basicColors.yellow,
  ...basicColors.orange,
};

export const reversedPalettes = {
  ...getReversePalette(brandColors.primary),
  ...getReversePalette(brandColors.secondary),
  ...getReversePalette(brandColors.accent),
  ...getReversePalette(basicColors.red),
  ...getReversePalette(basicColors.green),
  ...getReversePalette(basicColors.blue),
  ...getReversePalette(basicColors.violet),
  ...getReversePalette(basicColors.yellow),
  ...getReversePalette(basicColors.orange),
};

export const getColors = () => ({
  ...staticCustomColors,
  ...palettes,
});

export type PaletteKey = keyof typeof palettes;
export type ThemeColors = ReturnType<typeof getColors>;
export type ThemeColorName = keyof ThemeColors;
export type PaletteColorNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Palette<T extends string> = {
  [K in T as `${K}${PaletteColorNumber}`]: string;
} & {
  [BaseKey in T]: string;
};
