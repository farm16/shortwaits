import React from "react";
import { ImageBackground, StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "../../theme";
import { IconButton } from "../navigator-action-buttons/navigator-action-buttons";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AvatarProps {
  url?: string;
  size?: keyof typeof imageSizes;
  color?: string;
  mode?: "static" | "upload";
  style?: ViewStyle;
  onPress?: () => void;
}

const imageSizes = {
  small: 60,
  medium: 75,
  large: 100,
  default: 75,
} as const;

export function Avatar(props: AvatarProps) {
  const { size = "default", url, color, mode = "static", style: styleOverride, onPress } = props;
  const { Colors } = useTheme();

  const imageSize = imageSizes[size];

  const containerStyle = {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize * 0.5,
    backgroundColor: color ?? Colors.staticLightBackground,
    borderColor: Colors.gray,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle;

  const image = url ? (
    <View style={[containerStyle, styleOverride]}>
      <FastImage
        source={{
          uri: url,
        }}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: imageSize * 0.75,
          height: imageSize * 0.75,
        }}
      />
      {mode === "upload" ? (
        <IconButton
          style={{
            position: "absolute",
            bottom: -7,
            right: -6.5,
            width: 30,
            height: 30,
          }}
          iconType="add-image"
        />
      ) : null}
    </View>
  ) : (
    <View style={[containerStyle, styleOverride]}>
      <Icon name="image" color={Colors.white} size={imageSize * 0.5} />
      {mode === "upload" ? <IconButton style={styles.IconButton} iconType="add-image" /> : null}
    </View>
  );

  if (mode === "upload") {
    return <TouchableOpacity onPress={() => onPress()}>{image}</TouchableOpacity>;
  }

  return image;
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderLeftWidth: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  IconButton: {
    position: "absolute",
    bottom: -7,
    right: -6.5,
  },
  imageContainer: {
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: "cover",
    marginRight: 10,
  },
});
