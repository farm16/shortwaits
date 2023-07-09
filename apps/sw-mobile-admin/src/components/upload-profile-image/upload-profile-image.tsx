import React from "react";
import { ImageBackground, View, StyleSheet, ViewStyle } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Button } from "../common";
import { getDimensions, useTheme } from "../../theme";

interface UploadProfileImageProps {
  preset?: keyof typeof SIZES | "field";
  style?: ViewStyle;
}
const SIZES = {
  small: 10,
  medium: 15,
  large: 20,
} as const;

export function UploadProfileImage({
  style: styleOverride,
  preset = "medium",
}: UploadProfileImageProps) {
  const [image, setImage] = React.useState<any>(null);
  const { height: percentangeHeight } = getDimensions(SIZES[preset]);
  const height = preset === "field" ? 65 : percentangeHeight;
  const { Colors } = useTheme();
  const imageDimensions = {
    width: height,
    height: height,
    borderRadius: height / 2,
  };
  const style = [
    styleOverride,
    { backgroundColor: Colors.background, width: height },
  ];

  const onButtonPress = React.useCallback((type, options) => {
    if (type === "capture") {
      launchCamera(options, setImage);
    } else {
      launchImageLibrary(options, setImage);
    }
  }, []);

  return (
    <View style={style}>
      {image ? (
        <ImageBackground
          resizeMode="cover"
          resizeMethod="scale"
          source={{ uri: image.assets[0].uri }}
          style={imageDimensions}
          imageStyle={imageDimensions}
        />
      ) : (
        <Icon name="camera-party-mode" color={Colors.gray} size={height} />
      )}
      <Button
        preset="icon"
        onPress={() =>
          onButtonPress("capture", {
            maxHeight: 200,
            maxWidth: 200,
            saveToPhotos: false,
            mediaType: "photo",
            includeBase64: false,
          })
        }
        style={{
          ...styles.button,
          width: height / 2.5,
          height: height / 2.5,
          borderRadius: height / 4,
          right: -5,
          bottom: 5,
          backgroundColor: Colors.brandSecondary,
        }}
      >
        <Icon name="plus" color="white" size={20} />
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    position: "absolute",
  },
});
