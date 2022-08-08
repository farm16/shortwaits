import { useTheme } from "@shortwaits/admin/theme";
import React from "react";

import CheckBox, { CheckBoxProps } from "@react-native-community/checkbox";

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
