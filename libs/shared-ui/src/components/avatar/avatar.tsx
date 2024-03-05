import { noop } from "lodash";
import React, { useCallback } from "react";
import { View, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spinner from "react-native-spinkit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../theme";
import { IconButton } from "../icon-buttons/icon-buttons";

interface AvatarProps {
  url?: string;
  size?: keyof typeof imageSizes;
  color?: string;
  style?: ViewStyle;
  isLoading?: boolean;
  disabled?: boolean;
  mode: "static" | "upload" | "button";
  onPress?: () => void;
}

const imageSizes = {
  tiny: 40,
  small: 60,
  medium: 75,
  large: 100,
  default: 75,
} as const;

export function Avatar(props: AvatarProps) {
  const { isLoading, disabled = false, size = "default", url, color, mode = "static", style: styleOverride, onPress = noop } = props;
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

  if (mode === "button") {
    return (
      <TouchableOpacity style={[containerStyle, styleOverride]} disabled={disabled} onPress={() => onPress()}>
        {renderImage()}
      </TouchableOpacity>
    );
  }

  if (mode === "static") {
    return <View style={[containerStyle, styleOverride]}>{renderImage()}</View>;
  }

  return null;
}
