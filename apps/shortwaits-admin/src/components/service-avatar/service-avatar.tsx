import { useTheme } from "@/theme"
import React from "react"
import { ImageBackground, StyleSheet, View, ViewStyle } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { ServiceColorType } from "shortwaits-shared"
import { CircleIconButton } from "../navigator-action-buttons/navigator-action-buttons"

interface ServiceAvatarProps {
  imageUrl?: string
  size: keyof typeof imageSizes
  serviceColor?: ServiceColorType
  mode?: "static" | "upload"
}

const imageSizes = {
  small: 45,
  medium: 60,
  large: 100,
  default: 90
} as const

export function ServiceAvatar({
  size = "default",
  imageUrl,
  serviceColor,
  mode = "static"
}: ServiceAvatarProps) {
  const { Colors } = useTheme()

  const imageSize = mode === "upload" ? imageSizes.default : imageSizes[size]

  const containerStyle = {
    height: imageSize * 0.7,
    width: imageSize * 0.7,
    borderRadius: imageSize * 0.4,
    backgroundColor: serviceColor?.hexCode ?? Colors.lightGray
  }
  const image = imageUrl ? (
    <View>
      <ImageBackground
        style={[styles.imageContainer, containerStyle]}
        imageStyle={styles.image}
        source={{ uri: imageUrl }}
      />
      {mode === "upload" ? (
        <CircleIconButton
          style={styles.circleIconButton}
          iconType="add-image"
        />
      ) : null}
    </View>
  ) : (
    <View style={[styles.imageContainer, containerStyle]}>
      <Icon name="image" color={Colors.white} size={imageSize * 0.5} />
      {mode === "upload" ? (
        <CircleIconButton
          style={styles.circleIconButton}
          iconType="add-image"
        />
      ) : null}
    </View>
  )
  return image
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderLeftWidth: 5,
    borderRadius: 5,
    alignItems: "center"
  },
  circleIconButton: {
    position: "absolute",
    bottom: -7,
    right: -6.5
  },
  imageContainer: {
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {}
})
