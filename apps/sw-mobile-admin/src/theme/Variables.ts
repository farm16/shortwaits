/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { ThemeFontSize } from "./theme.type";
import { getColors } from "./Colors";
import { getFontSize, getResponsiveHeight } from "../utils";

export const Colors = {
  ...getColors(),
};

/**
 * FontSize
 */
export const FontSize: ThemeFontSize = {
  tiny: getFontSize(12),
  small: getFontSize(14),
  regular: getFontSize(16),
  large: getFontSize(18),
  xLarge: getFontSize(21),
};

/**
 * Metrics Sizes
 */
const tiny = getResponsiveHeight(8);
const small = getResponsiveHeight(12);
const regular = getResponsiveHeight(16);
const large = getResponsiveHeight(18);
const xLarge = getResponsiveHeight(21);

console.log({
  tiny,
  small,
  regular,
  large,
  xLarge,
});

export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
  xLarge,
} as const;

export const IconSizes = {
  tiny: 15,
  small: 20,
  regular: 25,
  large: 30,
} as const;
