import React from "react";
import { View, ViewStyle } from "react-native";
import { gutters } from "../../../theme/Variables";

export const Space = ({ direction = "horizontal", size = "normal", extra = 0 }: { direction?: "horizontal" | "vertical"; size?: keyof typeof gutters; extra?: number }) => {
  const height = gutters[size] + extra;
  const width = gutters[size] + extra;

  const horizontalStyle = {
    width: "100%",
    height: height,
  } as ViewStyle;
  const verticalStyle = {
    height: "100%",
    width: width,
  } as ViewStyle;

  return <View style={direction === "horizontal" ? horizontalStyle : verticalStyle} />;
};
