import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, View } from "react-native";

import { Button, ButtonProps } from "../button/button";
import { useTheme } from "../../../theme";
import { IconSizes } from "../../../theme/Variables";
import { Text } from "../text/text";

export type CardProps = ButtonProps & {
  leftIconName?: string;
  rightIconOnPress?: () => void;
  rightIconName?: string;
  rightIconSize?: keyof typeof IconSizes;
  leftIconOnPress?: () => void;
  leftIconSize?: keyof typeof IconSizes;
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
    rightIconColor = Colors.brandSecondary,
    leftIconColor = Colors.brandSecondary,
    rightIconSize = "regular",
    leftIconSize = "regular",
    children,
    text,
    leftIconOnPress,
    rightIconOnPress,
    textStyle: textStyleOverride,
    style: styleOverride,
    ...rest
  } = props;

  const disabledCardModes: Partial<CardProps["mode"]>[] = ["text-field", "static"];

  if (disabledCardModes.includes(mode)) {
    const defaultStyle = buttonViewPresets["card"] || buttonViewPresets.primary;
    const defaultTextStyle = buttonTextPresets["card"] || buttonTextPresets.primary;
    const textStyles = [defaultTextStyle, textStyleOverride];
    const style = [defaultStyle, styleOverride];

    const content = children || <Text text={text} style={textStyles} />;
    return (
      <View style={style}>
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
              <Icon style={styles.leftIcon} name={leftIconName} size={IconSizes[leftIconSize]} color={leftIconColor} />
            </Pressable>
          ))}
        <View style={styles.childrenContainer}>{content}</View>
        {rightIconName &&
          (mode === "static" || rightIconName === "none" ? null : (
            <Pressable onPress={rightIconOnPress} style={styles.iconContainer}>
              <Icon
                style={styles.rightIcon}
                name={rightIconName}
                size={IconSizes[rightIconSize]}
                color={rightIconColor}
              />
            </Pressable>
          ))}
      </View>
    );
  }

  return (
    <Button preset="card" {...rest}>
      {leftIconName &&
        (leftIconName === "none" ? null : (
          <Icon style={styles.leftIcon} name={leftIconName} size={IconSizes[leftIconSize]} color={leftIconColor} />
        ))}
      <View style={styles.childrenContainer}>{children}</View>
      {rightIconName &&
        (rightIconName === "none" ? null : (
          <Icon style={styles.rightIcon} name={rightIconName} size={IconSizes[rightIconSize]} color={rightIconColor} />
        ))}
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
