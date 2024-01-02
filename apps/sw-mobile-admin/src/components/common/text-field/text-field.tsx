import React, { ForwardedRef, forwardRef } from "react";
import { TextInput } from "react-native";
import { useTheme } from "../../../theme";
import { TextFieldProps } from "./text-field-types";

export * from "./text-field-types";

export const TextField = forwardRef((props: TextFieldProps, ref: ForwardedRef<TextInput>) => {
  const { placeholder, preset = "default", style: styleOverride, errors, ...rest } = props;

  const {
    Colors,
    Common: { textFieldPresets },
  } = useTheme();

  const style = textFieldPresets[preset] || textFieldPresets.default;
  const textInputStyle = [style, styleOverride];

  return <TextInput ref={ref} placeholderTextColor={Colors.subText} style={textInputStyle} placeholder={placeholder} {...rest} />;
});
