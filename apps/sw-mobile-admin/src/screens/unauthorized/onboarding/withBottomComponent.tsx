import React, { Children } from "react";
import { View } from "react-native";

export const WithBottomComponent = ({ children }) => {
  const arrayChildren = Children.toArray(children);

  return <View>{children}</View>;
};
