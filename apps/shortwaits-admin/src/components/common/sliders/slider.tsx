import React from "react";
import RNCSlider from "@react-native-community/slider";
import { SliderProps } from "react-native";

import { useTheme } from "../../../theme";

export const Slider = (props: SliderProps) => {
  const {
    minimumValue = 0,
    maximumValue = 1,
    onValueChange,
    step = 15,
    value,
    disabled = false,
  } = props;
  const { Colors } = useTheme();

  return (
    <RNCSlider
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      minimumTrackTintColor={Colors.gray}
      maximumTrackTintColor={Colors.gray}
      thumbTintColor={Colors.gray}
      // animateTransitions={true}
      // thumbTouchSize={{ width: 40, height: 40 }}
      step={step}
      disabled={disabled}
      value={value}
      onValueChange={onValueChange}
    />
  );
};
