import React from "react";
import { View } from "react-native";

interface LogoProps {
  withMargin?: boolean;
  center?: boolean;
}
export function Logo({ withMargin = true, center = true }: LogoProps) {
  return <View />;
}
