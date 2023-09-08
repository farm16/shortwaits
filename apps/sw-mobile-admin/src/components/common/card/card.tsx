import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, View } from "react-native";

import { Button, ButtonProps } from "../button/button";
import { useTheme } from "../../../theme";
import { IconSizes } from "../../../theme/Variables";
import { Space } from "../space/space";

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
    <Button preset="card" {...cardModes[mode]} disabled={getIsDisabled()} {...rest}>
      {leftIconName &&
        (mode === "static" || leftIconName === "none" ? null : (
          <Pressable
            disabled={!getIsDisabled()}
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
      <View style={styles.childrenContainer}>{children}</View>
      {rightIconName &&
        (mode === "static" || rightIconName === "none" ? null : (
          <Pressable disabled={!getIsDisabled()} onPress={rightIconOnPress} style={styles.iconContainer}>
            <Icon
              style={styles.rightIcon}
              name={rightIconName}
              size={IconSizes[rightIconSize]}
              color={rightIconColor}
            />
          </Pressable>
        ))}
      {/* <Space direction="vertical" size="tiny" /> */}
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
  leftIcon: {},
});
