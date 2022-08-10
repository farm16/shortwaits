import React from "react";
import CheckBox, { CheckBoxProps } from "@react-native-community/checkbox";

import { useTheme } from "../../../theme";

export const Checkbox = (props: CheckBoxProps) => {
  const { Colors } = useTheme();

  return (
    <CheckBox
      {...props}
      onCheckColor={Colors.brandSecondary6}
      onTintColor={Colors.brandSecondary6}
      boxType="square"
    />
  );
};
