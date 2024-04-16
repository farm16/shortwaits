/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { getResponsiveFontSize, getResponsiveHeight } from "../utils";
import { getColors } from "./Colors";

export const Colors = {
  ...getColors(),
};

export type Sizes = "tiny" | "small" | "normal" | "large" | "xLarge";

/**
 * FontSize
 */
export const FontSize = {
  tiny: getResponsiveFontSize(12),
  small: getResponsiveFontSize(14),
  normal: getResponsiveFontSize(16),
  large: getResponsiveFontSize(18),
  xLarge: getResponsiveFontSize(20),
} as const;

/**
 * Metrics Sizes
 */

export const metricsSizes = {
  tiny: getResponsiveHeight(12),
  small: getResponsiveHeight(14),
  normal: getResponsiveHeight(16),
  large: getResponsiveHeight(18),
  xLarge: getResponsiveHeight(20),
} as const;

export const gutters = {
  tiny: getResponsiveHeight(5),
  small: getResponsiveHeight(10),
  normal: getResponsiveHeight(16),
  large: getResponsiveHeight(20),
  xLarge: getResponsiveHeight(25),
} as const;

export const iconSizes = {
  tiny: getResponsiveHeight(15),
  small: getResponsiveHeight(20),
  normal: getResponsiveHeight(25),
  large: getResponsiveHeight(30),
  xLarge: getResponsiveHeight(35),
} as const;
