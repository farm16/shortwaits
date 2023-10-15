import React, { useCallback } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "../../theme";
import { IconButton } from "../navigator-action-buttons/navigator-action-buttons";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { noop } from "lodash";
import Spinner from "react-native-spinkit";

interface AvatarProps {
  url?: string;
  size?: keyof typeof imageSizes;
  color?: string;
  mode?: "static" | "upload";
  style?: ViewStyle;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const imageSizes = {
  small: 60,
  medium: 75,
  large: 100,
  default: 75,
} as const;

export function Avatar(props: AvatarProps) {
  const { isLoading = true, disabled = false, size = "default", url, color, mode = "static", style: styleOverride, onPress = noop } = props;
  const { Colors } = useTheme();

  const imageSize = imageSizes[size];

  const containerStyle = {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize * 0.5,
    backgroundColor: color ?? Colors.lightGray,
    borderColor: Colors.gray,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  } as ViewStyle;

  const renderCameraButton = useCallback(() => {
    return (
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
    );
  }, []);

  const renderImage = useCallback(() => {
    return url ? (
      <FastImage
        source={{
          uri: url,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={{
          width: imageSize * 0.95,
          height: imageSize * 0.95,
          borderRadius: imageSize * 0.95 * 0.5,
        }}
      />
    ) : (
      <Icon name="image" color={Colors.white} size={imageSize * 0.5} />
    );
  }, [Colors.white, imageSize, url]);

  if (isLoading) {
    return (
      <View style={[containerStyle, styleOverride]}>
        <Spinner style={{}} size={24} type={"ThreeBounce"} color={Colors.brandAccent} />
      </View>
    );
  }

  if (mode === "upload") {
    return (
      <TouchableOpacity style={[containerStyle, styleOverride]} disabled={disabled} onPress={() => onPress()}>
        {renderImage()}
        {renderCameraButton()}
      </TouchableOpacity>
    );
  }

  return <View style={[containerStyle, styleOverride]}>{renderImage()} </View>;
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
