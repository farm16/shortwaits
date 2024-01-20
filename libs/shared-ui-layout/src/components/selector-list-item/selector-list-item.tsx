import React, { FC, useMemo } from "react";
import { StyleSheet, TextStyle, View } from "react-native";

import FastImage from "react-native-fast-image";
import { Button, ButtonProps, Space, Text } from "../";
import { IconSizes, useTheme } from "../../theme";
import { generateAvatarUrl } from "../../utils/generateAvatarUrl";

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
  subTextStyle?: TextStyle;
  imageUrl?: string;
} & ButtonProps;

export const SelectorListItem: FC<SelectorListItemProps> = props => {
  const { Colors } = useTheme();

  const {
    onPress,
    rightIconName,
    leftIconName,
    rightIconColor = Colors.brandPrimary,
    leftIconColor = Colors.brandPrimary,
    rightIconSize = "regular",
    leftIconSize = "regular",
    title,
    subTitle,
    textStyle,
    imageUrl,
    subTextStyle,
    ...rest
  } = props;

  const handlePress = () => {
    onPress();
  };

  const avatarUrl = useMemo(() => {
    return generateAvatarUrl(title);
  }, [title]);

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
          uri: imageUrl || avatarUrl,
        }}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Text preset="cardTitle" style={textStyle} text={title} />
        {subTitle && (
          <>
            <Space size="tiny" />
            <Text preset="cardSubtitle" text={subTitle} style={subTextStyle} />
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
