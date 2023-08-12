import { getPaletteWithContrast, getReversePalette } from "./utils";

/**
 * Brand's Colors
 *
 * #F73859 primary
 * #63AE9D secondary
 * #C4EDDE secondary 2
 * #384259 accent
 *
 */

const brandColors = {
  primary: getPaletteWithContrast("brandPrimary", "#384259"),
  secondary: getPaletteWithContrast("brandSecondary", "#5cbdae"),
  accent: getPaletteWithContrast("brandAccent", "#2f2e41"),
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
  backgroundOverlay: "#FBFBFB",
  white: "#ffffff",
  black: "#26242b",

  //grays
  lightGray: "rgb(239,239,239)",
  gray: "rgb(200,200,200)",
  darkGray: "rgb(50,50,50)",

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

export const customColors = {
  ...staticColors,

  transparent: "rgba(0,0,0,0)",
  background: "#ffffff",
  backgroundOverlay: "#FBFBFB",
  white: "#ffffff",
  black: "#26242b",

  //grays
  lightGray: "rgb(239,239,239)",
  gray: "rgb(200,200,200)",
  darkGray: "rgb(50,50,50)",

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
