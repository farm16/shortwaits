import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export function getResponsiveFontSize(size, componentWidth = windowWidth) {
  // You can adjust the formula based on your design preferences
  const standardScreenWidth = 375; // Width of the screen you are designing for
  const scaleFactor = componentWidth / standardScreenWidth;

  return Math.round(scaleFactor * size);
}
