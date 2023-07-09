import React from "react";
import CheckBox, { CheckBoxProps } from "@react-native-community/checkbox";

import { useTheme } from "../../../theme";

export const Checkbox = (props: CheckBoxProps) => {
  const { Colors } = useTheme();

  return (
    <CheckBox
      {...props}
      onCheckColor={Colors.brandSecondary}
      onTintColor={Colors.brandSecondary}
      boxType="circle"
      style={{ marginHorizontal: 5 }}
    />
  );
};
