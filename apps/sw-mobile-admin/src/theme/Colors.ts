import { getPaletteWithContrast, getReversePalette } from "./utils";

/**
 * Brand's Colors
 *
 * #F73859 primary
 * #63AE9D secondary
 * #C4EDDE secondary 2
 * #384259 accent// #3f3d56 // #2f2e41
 *
 */

// #e5e5e5
// hair color rgb(178, 178, 178)
// rgb(240, 240, 239)

export const brandColors = {
  primary: getPaletteWithContrast("brandPrimary", "#030F26"),
  secondary: getPaletteWithContrast("brandSecondary", "#595FD9"),
  accent: getPaletteWithContrast("brandAccent", "#EB9B04"),
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

const staticColors = {
  static_welcomeBackground: brandColors.secondary.brandSecondary1,
  static_welcomeButtonBackground: "#FBFBFB",
  static_welcomeButtonText: brandColors.secondary.brandSecondary6,
  static_welcomeLinkText: "#ffffff",
  static_white: "#ffffff",
  static_black: "#26242b",
};

export const customDarkColors = {
  ...staticColors,

  transparent: "rgba(0,0,0,0)",
  background: "#ffffff",
  lightBackground: "#f8f8f8",
  white: "#fffffc",
  black: "#202020",

  //grays
  lightGray: "rgb(241,241,241)",
  gray: "rgb(226,226,226)",
  darkGray: "rgb(141,141,141)",

  text: "rgb(77, 77, 77)",
  subText: "rgba(77, 77, 77,0.60)",
  disabledText: "#C6C6C6",

  disabledBackground: "#EBEBE4",

  warning: "#f1c40f",
  success: "#30cb83",
  pending: "#f39c12",
  failed: "#e74c3c",
  cancel: "#34495e",
  successBackground: "#eaf9f2",
  failedBackground: "#fcf2f2",
  warningBackground: "#fdf5e7",
  cancelBackground: "#eaecee",

  inputBackground: "rgb(218,226,226)",

  staticLightBackground: "#f0f9f8",
  staticDarkBackground: "#356E6E",
};
export const customColors = {
  ...staticColors,

  transparent: "rgba(0,0,0,0)",
  background: "#ffffff",
  lightBackground: "#f8f8f8",
  white: "#fffffc",
  black: "#202020",

  //grays
  lightGray: "rgb(241,241,241)",
  gray: "rgb(226,226,226)",
  darkGray: "rgb(141,141,141)",

  text: "rgb(77, 77, 77)",
  subText: "rgba(77, 77, 77,0.60)",
  disabledText: "#C6C6C6",

  disabledBackground: "#EBEBE4",

  success: "#30cb83",
  pending: "#f39c12",
  failed: "#e74c3c",
  cancel: "#34495e",
  warning: "#f1c40f",
  successBackground: "#eaf9f2",
  failedBackground: "#fcf2f2",
  warningBackground: "#fdf5e7",
  cancelBackground: "#eaecee",

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
  ...customColors,
  ...palettes,
});

export const getDarkColors = () => ({
  ...customDarkColors,
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
