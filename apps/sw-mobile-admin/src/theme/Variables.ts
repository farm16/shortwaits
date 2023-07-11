/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { ThemeFontSize } from "./theme.type";
import { getColors } from "./Colors";

export const Colors = {
  ...getColors(),
};

/**
 * FontSize
 */
export const FontSize: ThemeFontSize = {
  tiny: 13,
  small: 15,
  regular: 18,
  large: 35,
};

/**
 * Metrics Sizes
 */
const tiny = 7; // 10
const small = tiny * 2; // 8
const regular = tiny * 3; // 12
const large = regular * 2; // 24
const xLarge = large * 2; // 24

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