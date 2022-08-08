import React, { FC } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Shadow } from "react-native-shadow-2"
import Spinner from "react-native-spinkit"

import { Text } from "../text/text"
import { useTheme } from "@/theme"
import { ButtonProps } from "./button-types"

export const Button: FC<ButtonProps> = props => {
  const {
    preset = "primary",
    withShadow = false,
    iText,
    text,
    isLoading = false,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    icon,
    disabled = false,
    state = "enabled",
    ...rest
  } = props

  const {
    Colors,
    Common: { buttonTextPresets, buttonViewPresets }
  } = useTheme()

  if (state === "loading")
    return (
      <Spinner
        style={styles.spinner}
        size={40}
        type={"ThreeBounce"}
        color={Colors.darkText}
      />
    )

  const defaultStyle = buttonViewPresets[preset] || buttonViewPresets.primary
  const textStyle = buttonTextPresets[preset] || buttonTextPresets.primary
  const textStyles = [textStyle, textStyleOverride]
  const Icon = icon
  const content = children || (
    <Text iText={iText} text={text} style={textStyles} />
  )

  const WithOutShadow = (
    <TouchableOpacity
      {...rest}
      style={[defaultStyle, styleOverride]}
      disabled={disabled || state === "disabled"}
    >
      {Icon && (
        <Icon
          height={props.iconSize || buttonViewPresets.socialIcon.height}
          width={props.iconSize || buttonViewPresets.socialIcon.width}
          style={buttonViewPresets.socialIcon}
        />
      )}

      {content}
    </TouchableOpacity>
  )

  const WithShadow = <Shadow distance={4}>{WithOutShadow}</Shadow>

  return withShadow ? WithShadow : WithOutShadow
}

const styles = StyleSheet.create({
  spinner: {
    marginBottom: 5
  }
})

export * from "./button-types"
