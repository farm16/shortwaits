import React, { FC } from "react";
import { StyleSheet, TextStyle, View } from "react-native";

import { Text, Pressable, Space, PressableProps } from "../";
import { IconSizes, useTheme } from "../../theme";

type SelectorListItemProps = {
  onPress: () => void;
  rightIconName?: string;
  leftIconName?: string;
  rightIconColor?: string;
  leftIconColor?: string;
  rightIconSize?: keyof typeof IconSizes;
  leftIconSize?: keyof typeof IconSizes;
  title: string;
  subTitle?: string;
  textStyle?: TextStyle;
} & PressableProps;

export const SelectorListItem: FC<SelectorListItemProps> = props => {
  const { Colors } = useTheme();

  const {
    onPress,
    rightIconName,
    leftIconName,
    rightIconColor = Colors.brandSecondary,
    leftIconColor = Colors.brandSecondary,
    rightIconSize = "regular",
    leftIconSize = "regular",
    title,
    subTitle,
    textStyle,
    ...rest
  } = props;

  const handlePress = () => {
    onPress();
  };

  return (
    <Pressable
      preset="card"
      onPress={handlePress}
      leftIconName={leftIconName}
      leftIconColor={leftIconColor}
      leftIconSize={IconSizes[leftIconSize]}
      rightIconName={rightIconName}
      rightIconColor={rightIconColor}
      rightIconSize={IconSizes[rightIconSize]}
      {...rest}
    >
      <View style={styles.content}>
        <Text preset="cardTitle" style={textStyle} text={title} />
        {subTitle && (
          <>
            <Space size="tiny" />
            <Text preset="cardSubtitle" text={subTitle} />
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  rightIcon: {},
  leftIcon: {},
});
