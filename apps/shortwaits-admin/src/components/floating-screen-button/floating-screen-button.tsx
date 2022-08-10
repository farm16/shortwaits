import React from "react";
import { View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Button, ButtonProps } from "../common";
import { getDimensions, useTheme } from "../../theme";
import { ThemeColorName } from "../../theme/Colors";
import { IconSizes } from "../../theme/Variables";

interface FloatingScreenButtonProps extends Omit<ButtonProps, "iconSize"> {
  iconName: string;
  iconSize?: keyof typeof IconSizes;
  backgroundColor?: ThemeColorName;
  iconColor?: ThemeColorName;
}

export const FloatingScreenButton = (props: FloatingScreenButtonProps) => {
  const { width } = getDimensions(100, "screen");
  const { Colors } = useTheme();
  const buttonDiameter = width * 0.15;
  const {
    iconName,
    backgroundColor = Colors.brandSecondary,
    iconColor = Colors.white,
    iconSize: buttonIconSize,
    ...rest
  } = props;
  const buttonStyle: ViewStyle = {
    backgroundColor,
    borderRadius: buttonDiameter * 0.5,
    height: buttonDiameter,
    width: buttonDiameter,
    alignItems: "center",
    justifyContent: "center",
  };
  const iconSize = buttonIconSize
    ? IconSizes[buttonIconSize]
    : buttonDiameter * 0.5;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        marginRight: width * 0.07,
        marginBottom: width * 0.1,
        zIndex: 1, //lol
      }}
    >
      <Button withShadow {...rest} preset="none" style={buttonStyle}>
        <Icon name={iconName} color={iconColor} size={iconSize} />
      </Button>
    </View>
  );
};
