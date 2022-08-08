import { useTheme } from "@/theme"
import React from "react"
import * as RNSlider from "react-native-slider"

interface SliderProps {
  onValueChange: void
  value: number
  disabled?: boolean
  onSlidingComplete?: void
  step?: number
  maximumValue?: number
  minimumValue?: number
}

export const Slider = (props: SliderProps) => {
  const {
    minimumValue = 0,
    maximumValue = 1,
    onValueChange,
    step = 15,
    value,
    disabled = false
  } = props
  const { Colors } = useTheme()

  return (
    <RNSlider
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      minimumTrackTintColor={Colors.gray}
      maximumTrackTintColor={Colors.gray}
      thumbTintColor={Colors.gray}
      animateTransitions={true}
      thumbTouchSize={{ width: 40, height: 40 }}
      step={step}
      disabled={disabled}
      value={value}
      onValueChange={onValueChange}
    />
  )
}
