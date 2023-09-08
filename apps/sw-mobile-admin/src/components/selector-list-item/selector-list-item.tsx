import React, { FC } from "react";
import { StyleSheet, TextStyle, View, Image } from "react-native";

import { Text, Space, ButtonProps, Button } from "../";
import { IconSizes, useTheme } from "../../theme";
import FastImage from "react-native-fast-image";

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
  imageUrl?: string;
} & ButtonProps;

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
    imageUrl,
    ...rest
  } = props;

  const handlePress = () => {
    onPress();
  };

  return (
    <Button
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
      <FastImage
        source={{
          uri: imageUrl || "https://picsum.photos/60/60",
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Text preset="cardTitle" style={textStyle} text={title} />
        {subTitle && (
          <>
            <Space size="tiny" />
            <Text preset="cardSubtitle" text={subTitle} />
          </>
        )}
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: "cover",
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  rightIcon: {},
  leftIcon: {},
});
