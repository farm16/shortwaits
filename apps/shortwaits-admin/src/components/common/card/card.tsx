import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

import { Button, ButtonProps } from "../button/button";
import { useTheme } from "../../../theme";
import { IconSizes } from "../../../theme/Variables";

export interface CardIconsProps {
  leftIconName?: string;
  rightIconOnPress?: () => void;
  rightIconName?: string;
  rightIconSize?: keyof typeof IconSizes;
  leftIconOnPress?: () => void;
  leftIconSize?: keyof typeof IconSizes;
  rightIconColor?: string;
  leftIconColor?: string;
}
export interface CardProps extends ButtonProps, CardIconsProps {
  mode: keyof typeof cardModes;
}
export const CARD_HEIGHT = 80;

const cardModes = {
  "text-field": {
    disabled: true,
  },
  button: {},
  static: {
    disabled: true,
  },
};
export const Card = (props: CardProps) => {
  const { Colors } = useTheme();

  const {
    mode,
    rightIconName,
    leftIconName,
    rightIconColor = Colors.brandSecondary6,
    leftIconColor = Colors.brandSecondary6,
    rightIconSize = "regular",
    leftIconSize = "regular",
    children,
    leftIconOnPress,
    rightIconOnPress,
    ...rest
  } = props;

  return (
    <Button
      preset="card"
      style={styles.container}
      {...cardModes[mode]}
      {...rest}
    >
      {leftIconName && (
        <Button
          disabled={leftIconOnPress ? false : true}
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
      )}
      <View style={styles.childrenContaiener}>{children}</View>
      {rightIconName && (
        <Button
          disabled={rightIconOnPress ? false : true}
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
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: CARD_HEIGHT,
    maxHeight: CARD_HEIGHT,
  },
  childrenContaiener: {
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