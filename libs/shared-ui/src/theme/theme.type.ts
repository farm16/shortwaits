import { Theme as ThemeNavigationColors } from "@react-navigation/native";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { ThemeColors } from "./Colors";
import Common from "./Common";
import { MetricsSizes } from "./Variables";

export type StyleType = TextStyle & ViewStyle & ImageStyle;
export type ThemeNavigationTheme = {
  dark: boolean;
  colors: ThemeNavigationColors;
};
export type ThemeFontSize = { [key: string]: number };
export type ThemeMetricsSizes = typeof MetricsSizes;

export type ThemeVariables = {
  Colors: ThemeColors;
  FontSize: ThemeFontSize;
  MetricsSizes: ThemeMetricsSizes;
};

export type ThemeFonts = { [key: string]: TextStyle };
export type ThemeLayout = { [key: string]: StyleType };
export type ThemeGutters = { [key: string]: StyleType };
export type ThemeCommon = ReturnType<typeof Common>;
export type ThemeImages = { [key: string]: any };

export type Theme = {
  Colors: ThemeColors;
  FontSize: ThemeFontSize;
  MetricsSizes: ThemeMetricsSizes;
  Fonts: ThemeFonts;
  Images: ThemeImages;
  Layout: ThemeLayout;
  Gutters: ThemeGutters;
  Common: ThemeCommon;
  Variables?: Partial<ThemeVariables>;
};
export interface ThemeCommonParams {
  Colors: ThemeColors;
  FontSize: ThemeFontSize;
  MetricsSizes: ThemeMetricsSizes;
  Fonts: ThemeFonts;
  Images: ThemeImages;
  Layout: ThemeLayout;
  Gutters: ThemeGutters;
  Variables?: Partial<ThemeVariables>;
}

export { ThemeNavigationColors };
