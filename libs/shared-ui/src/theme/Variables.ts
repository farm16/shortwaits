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
  xLarge: getResponsiveFontSize(21),
} as { [key in Sizes]: number };

/**
 * Metrics Sizes
 */
const tiny = getResponsiveHeight(12);
const small = getResponsiveHeight(14);
const normal = getResponsiveHeight(16);
const large = getResponsiveHeight(18);
const xLarge = getResponsiveHeight(21);

console.log({
  tiny,
  small,
  normal,
  large,
  xLarge,
});

export const metricsSizes = {
  tiny,
  small,
  normal,
  large,
  xLarge,
} as { [key in Sizes]: number };

export const iconSizes = {
  tiny: getResponsiveHeight(15),
  small: getResponsiveHeight(20),
  normal: getResponsiveHeight(25),
  large: getResponsiveHeight(30),
  xLarge: getResponsiveHeight(35),
} as { [key in Sizes]: number };
