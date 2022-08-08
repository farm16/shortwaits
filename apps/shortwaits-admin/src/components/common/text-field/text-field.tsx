import React, { ForwardedRef, forwardRef } from "react";
import { TextInput } from "react-native";
import { TextFieldProps } from "./text-field-types";
import { useTheme } from "@shortwaits/admin/theme";

export * from "./text-field-types";

export const TextField = forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<null>) => {
    const {
      placeholder,
      preset = "default",
      style: styleOverride,
      errors,
      ...rest
    } = props;

    const {
      Colors,
      Common: { textFieldPresets },
    } = useTheme();

    const style = textFieldPresets[preset] || textFieldPresets.default;
    const textInputStyle = [style, styleOverride];

    return (
      <TextInput
        ref={ref}
        placeholderTextColor={Colors.lightText}
        style={textInputStyle}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
);
