import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export const getFontSize = (size = 16) => {
  const fontSize = moderateScale(size);
  return fontSize;
};

export const getResponsiveHeight = (size = 16) => {
  const height = verticalScale(size);
  return height;
};

export const getResponsiveWidth = (size = 16) => {
  const width = horizontalScale(size);
  return width;
};
