import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export const getFontSize = (size = 16) => {
  const fontScale = PixelRatio.getFontScale();
  const fontSize = size / fontScale;
  return moderateScale(fontSize);
};

export const getResponsiveHeight = (size = 16) => {
  const height = verticalScale(size);
  return height;
};

export const getResponsiveWidth = (size = 16) => {
  const width = horizontalScale(size);
  return width;
};
