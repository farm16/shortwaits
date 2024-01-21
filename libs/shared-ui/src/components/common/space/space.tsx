import React from "react";
import { View, ViewStyle } from "react-native";
import { MetricsSizes } from "../../../theme/Variables";

export const Space = ({ direction = "horizontal", size = "regular", extra = 0 }: { direction?: "horizontal" | "vertical"; size?: keyof typeof MetricsSizes; extra?: number }) => {
  const metricSize = MetricsSizes[size];
  const horizontalStyle = {
    width: "100%",
    height: metricSize + extra,
  } as ViewStyle;
  const verticalStyle = {
    height: "100%",
    width: metricSize,
  } as ViewStyle;
  return <View style={direction === "horizontal" ? horizontalStyle : verticalStyle} />;
};
