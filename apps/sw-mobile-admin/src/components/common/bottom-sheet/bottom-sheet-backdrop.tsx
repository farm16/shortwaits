import React, { useMemo } from "react"
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated"

export const BottomSheetBackdrop = ({
  animatedIndex,
  style
}: BottomSheetBackdropProps) => {
  // animated variables
  console.log(animatedIndex.value)
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolate.CLAMP
    )
  }))

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#c3d4ca"
      },
      containerAnimatedStyle
    ],
    [style, containerAnimatedStyle]
  )

  return <Animated.View style={containerStyle} />
}
