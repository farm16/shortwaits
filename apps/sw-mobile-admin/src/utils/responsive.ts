import { PixelRatio } from "react-native";

export const getFontSize = (size = 16) => {
  const fontScale = PixelRatio.getFontScale();
  const fontSize = size / fontScale;
  return fontSize;
};
