import React from "react";
import { View, ViewStyle } from "react-native";
import { metricsSizes } from "../../../theme/Variables";

export const Space = ({ direction = "horizontal", size = "normal", extra = 0 }: { direction?: "horizontal" | "vertical"; size?: keyof typeof metricsSizes; extra?: number }) => {
  const height = metricsSizes[size] + extra;
  const width = metricsSizes[size] + extra;

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
