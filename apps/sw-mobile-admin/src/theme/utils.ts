import fromPairs from "lodash/fromPairs"
import { Dimensions } from "react-native"
import { Palette } from "./Colors"

export function getPaletteWithContrast<Key extends string>(
  baseName: Key,
  baseColor: string
): Palette<Key> {
  const colors = getTints(baseColor)
  return {
    [baseName]: baseColor,
    ...fromPairs(
      colors.map((color, index) => [`${baseName}${index + 1}`, color])
    )
  } as Palette<Key>
}

export const getHueAndSaturationFromHex = (hex: string) => {
  let r = 0
  let g = 0
  let b = 0
  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1]
    g = "0x" + hex[2] + hex[2]
    b = "0x" + hex[3] + hex[3]
  } else if (hex.length === 7) {
    r = "0x" + hex[1] + hex[2]
    g = "0x" + hex[3] + hex[4]
    b = "0x" + hex[5] + hex[6]
  }

  r /= 255
  g /= 255
  b /= 255
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin

  let hue = 0
  let saturation = 0
  let lightness = 0

  if (delta === 0) hue = 0
  else if (cmax === r) hue = ((g - b) / delta) % 6
  else if (cmax === g) hue = (b - r) / delta + 2
  else hue = (r - g) / delta + 4

  hue = Math.round(hue * 60)

  if (hue < 0) hue += 360

  lightness = (cmax + cmin) / 2
  saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  saturation = +(saturation * 100).toFixed(1)

  return [hue, Math.round(saturation)]
}

export const getTints = (hex: string) => {
  const tintLevels = 9
  const hslColors = []
  for (let i = tintLevels; i > 0; i--) {
    const [hue, saturation] = getHueAndSaturationFromHex(hex)
    hslColors.push(`hsl(${hue}, ${saturation}%, ${i * 10}%)`)
  }
  return hslColors
}

export const getPaletteBaseKey = palette => {
  const keys = Object.keys(palette)
  const baseKey = keys.find(key => key.match(/^[a-z]+$/))

  return baseKey
}

export const getReversePalette = palette => {
  const reversedPalette = { ...palette }
  const baseKey = getPaletteBaseKey(palette)
  const lastNumber = 9 /*(keys.length / 2 - 1)*/

  for (let i = 1; i <= lastNumber; i++) {
    const last = 1 + lastNumber - i
    const newKey = `${baseKey}${i}`
    const oldKey = `${baseKey}${last}`
    reversedPalette[newKey] = palette[oldKey]
  }

  return reversedPalette
}

export const getDimensions = (
  percentage = 100,
  dim: "window" | "screen" = "screen"
) => {
  const _percentage: number = Math.round(percentage) / 100
  const dimensions: { width: number; height: number } = Dimensions.get(dim)

  return {
    width: parseFloat((dimensions.width * _percentage).toFixed(2)),
    height: parseFloat((dimensions.height * _percentage).toFixed(2))
  }
}

/**
 *
 * @param percentage Default is 30%
 * @returns Object {width,height}
 *
 * uses @getDimensions
 */
export const getLogoDimensions = (percentage = 30) => getDimensions(percentage)
