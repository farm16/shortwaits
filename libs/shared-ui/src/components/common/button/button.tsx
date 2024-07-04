import { FC } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Spinner from "react-native-spinkit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../../theme";
import { getResponsiveHeight } from "../../../utils";
import { Text } from "../text/text";
import { ButtonPresets, ButtonProps } from "./button-types";

export const Button: FC<ButtonProps> = props => {
  const {
    preset = "primary",
    iText,
    text,
    isLoading = false,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    rightIconName,
    rightIconSize = 20,
    rightIconColor,
    leftIconName,
    leftIconSize = 20,
    leftIconColor,
    disabled: disabledOverride,
    isTouchableOpacity = true,
    ...rest
  } = props;

  let presetOverride = preset;

  const {
    Colors,
    Common: { buttonTextPresets, buttonViewPresets },
  } = useTheme();

  if (isLoading) return <Spinner style={styles.spinner} size={40} type={"ThreeBounce"} color={Colors.white} />;

  const isDisabledPresetPresent = (preset: string, presets: Record<string, object>) => presets[`${preset}-disabled`] !== undefined;

  if (isDisabledPresetPresent(preset, buttonViewPresets) && disabledOverride) {
    presetOverride = `${preset}-disabled` as ButtonPresets;
  }

  const defaultStyle = buttonViewPresets[presetOverride] || buttonViewPresets.primary;
  const textStyle = buttonTextPresets[presetOverride] || buttonTextPresets.primary;
  const textStyles = [textStyle, textStyleOverride];

  const content = children || <Text iText={iText} text={text} style={textStyles} />;

  if (isTouchableOpacity) {
    return (
      <TouchableOpacity {...rest} style={[defaultStyle, styleOverride]} disabled={disabledOverride}>
        {leftIconName && (leftIconName === "none" ? null : <Icon name={leftIconName} size={leftIconSize} color={leftIconColor} />)}
        {content}
        {rightIconName && (rightIconName === "none" ? null : <Icon name={rightIconName} size={rightIconSize as number} color={rightIconColor} />)}
      </TouchableOpacity>
    );
  }

  return (
    <Pressable {...rest} style={[defaultStyle, styleOverride]} disabled={disabledOverride}>
      {leftIconName && (leftIconName === "none" ? null : <Icon name={leftIconName} size={leftIconSize} color={leftIconColor} />)}
      {content}
      {rightIconName && (rightIconName === "none" ? null : <Icon name={rightIconName} size={rightIconSize as number} color={rightIconColor} />)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  spinner: {
    marginBottom: getResponsiveHeight(5),
  },
});
