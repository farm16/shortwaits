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
  primary: getPaletteWithContrast("brandPrimary", "#222130"),
  secondary: getPaletteWithContrast("brandSecondary", "#45927B"),
  accent: getPaletteWithContrast("brandAccent", "#3f3d56"),
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
  backgroundOverlay: "#e5e5e5",
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
  failed: "#E24939",
  successBackground: "#e0f4e0",
  failedBackground: "#f9e0e0",

  inputBackground: "rgb(218,226,226)",

  staticLightBackground: "#f0f9f8",
  staticDarkBackground: "#356E6E",
};

export const customColors = {
  ...staticColors,

  transparent: "rgba(0,0,0,0)",
  background: "#ffffff",
  backgroundOverlay: "#F8FAFC", //rgb(245, 245, 245) #e5e5e5
  white: "#ffffff",
  black: "#202020",

  //grays
  lightGray: "rgb(241,241,241)",
  gray: "rgb(226,226,226)",
  darkGray: "rgb(141,141,141)",

  text: "rgb(77, 77, 77)",
  subText: "rgba(77, 77, 77,0.60)",
  disabledText: "rgba(77, 77, 77,0.38)",

  success: "#28a745",
  pending: "#e0c01f",
  failed: "#E24939",
  successBackground: "#e0f4e0",
  failedBackground: "#f9e0e0",

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
