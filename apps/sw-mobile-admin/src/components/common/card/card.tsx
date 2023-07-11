import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

import { Button, ButtonProps } from "../button/button";
import { useTheme } from "../../../theme";
import { IconSizes } from "../../../theme/Variables";

export type CardProps = ButtonProps & {
  leftIconName?: string;
  rightIconOnPress?: () => void;
  rightIconName?: string;
  rightIconSize?: keyof typeof IconSizes;
  leftIconOnPress?: () => void;
  leftIconSize?: keyof typeof IconSizes;
  rightIconColor?: string;
  leftIconColor?: string;
  mode: keyof typeof cardModes;
};

export const CARD_HEIGHT = 70;

const cardModes = {
  "text-field": {
    disabled: true,
  },
  listItem: {},
  button: {},
  static: {
    disabled: true,
  },
} as const;
export const Card = (props: CardProps) => {
  const { Colors } = useTheme();

  const {
    mode,
    rightIconName,
    leftIconName,
    rightIconColor = Colors.brandSecondary,
    leftIconColor = Colors.brandSecondary,
    rightIconSize = "regular",
    leftIconSize = "regular",
    children,
    leftIconOnPress,
    rightIconOnPress,
    style: styleOverride,
    ...rest
  } = props;

  const getIsDisabled = () => {
    if (leftIconOnPress || rightIconOnPress) {
      return true;
    }
    if (mode === "text-field") {
      return true;
    }
    if (mode === "static") {
      return true;
    }
    return false;
  };

  return (
    <Button
      preset="card"
      {...cardModes[mode]}
      {...rest}
      disabled={getIsDisabled()}
      style={[styles.cardHeight, styleOverride]}
    >
      {leftIconName &&
        (mode === "static" || leftIconName === "none" ? null : (
          <Button
            disabled={!getIsDisabled()}
            onPress={leftIconOnPress}
            preset="none"
            style={styles.iconContainer}
          >
            <Icon
              style={styles.leftIcon}
              name={leftIconName}
              size={IconSizes[leftIconSize]}
              color={leftIconColor}
            />
          </Button>
        ))}
      <View style={styles.childrenContainer}>{children}</View>
      {rightIconName &&
        (mode === "static" || rightIconName === "none" ? null : (
          <Button
            disabled={!getIsDisabled()}
            onPress={rightIconOnPress}
            preset="none"
            style={styles.iconContainer}
          >
            <Icon
              style={styles.rightIcon}
              name={rightIconName}
              size={IconSizes[rightIconSize]}
              color={rightIconColor}
            />
          </Button>
        ))}
    </Button>
  );
};

const styles = StyleSheet.create({
  cardHeight: {
    minHeight: CARD_HEIGHT,
    maxHeight: CARD_HEIGHT,
  },
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
  leftIcon: {},
});
