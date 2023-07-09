import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Spinner from "react-native-spinkit";

import { Text } from "../text/text";
import { useTheme } from "../../../theme";
import { ButtonProps } from "./button-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const Button: FC<ButtonProps> = props => {
  const {
    preset = "primary",
    withShadow = false,
    iText,
    text,
    isLoading = false,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    rightIconName,
    rightIconSize = 20,
    rightIconColor,
    leftIconName,
    leftIconSize = 20,
    leftIconColor,
    disabled = false,
    state = "enabled",
    ...rest
  } = props;

  const {
    Colors,
    Common: { buttonTextPresets, buttonViewPresets },
  } = useTheme();

  if (state === "loading")
    return (
      <Spinner
        style={styles.spinner}
        size={40}
        type={"ThreeBounce"}
        color={Colors.text}
      />
    );

  const defaultStyle = buttonViewPresets[preset] || buttonViewPresets.primary;
  const textStyle = buttonTextPresets[preset] || buttonTextPresets.primary;
  const textStyles = [textStyle, textStyleOverride];

  const content = children || (
    <Text iText={iText} text={text} style={textStyles} />
  );

  return (
    <TouchableOpacity
      {...rest}
      style={[defaultStyle, styleOverride]}
      disabled={disabled || state === "disabled"}
    >
      {leftIconName &&
        (leftIconName === "none" ? null : (
          <Icon name={leftIconName} size={leftIconSize} color={leftIconColor} />
        ))}
      {content}
      {rightIconName &&
        (rightIconName === "none" ? null : (
          <Icon
            name={rightIconName}
            size={rightIconSize}
            color={rightIconColor}
          />
        ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  spinner: {
    marginBottom: 5,
  },
});

export * from "./button-types";
