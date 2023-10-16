import { PixelRatio } from "react-native";

export const getFontSize = (size = 16) => {
  const fontScale = PixelRatio.getFontScale();
  const fontSize = size / fontScale;
  return fontSize;
};

export const getResponsiveHeight = (size = 16) => {
  const height = PixelRatio.getPixelSizeForLayoutSize(size);
  return height;
};

export const getResponsiveWidth = (size = 16) => {
  const width = PixelRatio.getPixelSizeForLayoutSize(size);
  return width;
};
