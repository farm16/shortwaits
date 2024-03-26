import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "../../../theme";
import { iconSizes } from "../../../theme/Variables";
import { Button, ButtonProps } from "../button/button";
import { Text } from "../text/text";

export type CardProps = ButtonProps & {
  leftIconName?: string;
  rightIconOnPress?: () => void;
  rightIconName?: string;
  rightIconSize?: keyof typeof iconSizes;
  leftIconOnPress?: () => void;
  leftIconSize?: keyof typeof iconSizes;
  rightIconColor?: string;
  leftIconColor?: string;
  mode: "text-field" | "listItem" | "button" | "static";
};

export const Card = (props: CardProps) => {
  const {
    Colors,
    Common: { buttonTextPresets, buttonViewPresets },
  } = useTheme();
  const {
    mode,
    rightIconName,
    leftIconName,
    rightIconColor: rightIconColorOverride = Colors.brandPrimary,
    leftIconColor: leftIconColorOverride = Colors.brandPrimary,
    rightIconSize = "normal",
    leftIconSize = "normal",
    children,
    text,
    leftIconOnPress,
    rightIconOnPress,
    textStyle: textStyleOverride,
    style: styleOverride,
    disabled = false,
    ...rest
  } = props;

  const disabledCardModes: Partial<CardProps["mode"]>[] = ["text-field", "static"];
  const disabledStyles = disabled
    ? {
        backgroundColor: Colors.lightGray,
        borderColor: Colors.disabledText,
        borderWidth: 1,
        borderRadius: 4,
      }
    : {};

  const rightIconColor = disabled ? Colors.disabledText : rightIconColorOverride;
  const leftIconColor = disabled ? Colors.disabledText : leftIconColorOverride;

  if (disabledCardModes.includes(mode)) {
    const defaultStyle = buttonViewPresets["card"] || buttonViewPresets.primary;
    const defaultTextStyle = buttonTextPresets["card"] || buttonTextPresets.primary;
    const textStyles = [defaultTextStyle, textStyleOverride];
    const style = [defaultStyle, styleOverride];

    const content = children || <Text text={text} style={textStyles} />;
    return (
      <View style={[style, disabledStyles]}>
        {leftIconName &&
          (mode === "static" || leftIconName === "none" ? null : (
            <Pressable
              onPress={leftIconOnPress}
              style={[
                styles.iconContainer,
                {
                  marginRight: 10,
                },
              ]}
            >
              <Icon style={styles.leftIcon} name={leftIconName} size={iconSizes[leftIconSize]} color={leftIconColor} />
            </Pressable>
          ))}
        <View style={styles.childrenContainer}>{content}</View>
        {rightIconName &&
          (mode === "static" || rightIconName === "none" ? null : (
            <Pressable onPress={rightIconOnPress} style={styles.iconContainer}>
              <Icon style={styles.rightIcon} name={rightIconName} size={iconSizes[rightIconSize]} color={rightIconColor} />
            </Pressable>
          ))}
      </View>
    );
  }

  return (
    <Button preset="card" {...rest} disabled={disabled} style={[disabledStyles]}>
      {leftIconName && (leftIconName === "none" ? null : <Icon style={styles.leftIcon} name={leftIconName} size={iconSizes[leftIconSize]} color={leftIconColor} />)}
      <View style={styles.childrenContainer}>{children}</View>
      {rightIconName && (rightIconName === "none" ? null : <Icon style={styles.rightIcon} name={rightIconName} size={iconSizes[rightIconSize]} color={rightIconColor} />)}
    </Button>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  iconContainer: {
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {},
  leftIcon: {
    marginRight: 10,
  },
});
