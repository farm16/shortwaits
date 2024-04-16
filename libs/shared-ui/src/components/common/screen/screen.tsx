import React from "react";
import { KeyboardAvoidingView, Platform, StatusBar, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../theme";
import { isNonScrolling, offsets, presets } from "./screen.presets";
import { ScreenProps } from "./screen.props";

const isIos = Platform.OS === "ios";

function ScreenWithoutScrolling(props: ScreenProps) {
  const {
    backgroundColor: overrideBackgroundColor,
    statusBarBackgroundColor: overrideStatusBarBackgroundColor,
    keyboardOffset,
    statusBarStyle,
    children,
    style: styleOverride,
    unsafe,
    unsafeBottom,
    withHorizontalPadding,
  } = props;

  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const style = styleOverride || {};
  const { Colors } = useTheme();

  const backgroundColor = overrideBackgroundColor ? Colors[overrideBackgroundColor] : style?.backgroundColor ? style.backgroundColor : Colors.white;
  const statusBarBackgroundColor = overrideStatusBarBackgroundColor ? Colors[overrideStatusBarBackgroundColor] : backgroundColor;

  const insetStyle = {
    paddingTop: unsafe ? 0 : insets.top,
    paddingBottom: unsafeBottom ? 0 : insets.bottom,
    paddingHorizontal: withHorizontalPadding ? 16 : 0,
  };

  return (
    <KeyboardAvoidingView style={[preset.outer, { backgroundColor }]} behavior={isIos ? "padding" : undefined} keyboardVerticalOffset={offsets[keyboardOffset || "none"]}>
      <StatusBar barStyle={statusBarStyle || "dark-content"} backgroundColor={statusBarBackgroundColor} />
      <View style={[preset.inner, style, insetStyle]}>{children}</View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const {
    backgroundColor: overrideBackgroundColor,
    statusBarBackgroundColor: overrideStatusBarBackgroundColor,
    keyboardOffset,
    keyboardShouldPersistTaps,
    statusBarStyle,
    children,
    style: styleOverride,
    unsafe,
    unsafeBottom,
    stickyHeaderIndices,
    showsVerticalScrollIndicator = false,
    withHorizontalPadding,
  } = props;
  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const style = styleOverride || {};
  const { Colors } = useTheme();

  const backgroundColor = overrideBackgroundColor ? Colors[overrideBackgroundColor] : style?.backgroundColor ? style.backgroundColor : Colors.white;
  const statusBarBackgroundColor = overrideStatusBarBackgroundColor ? Colors[overrideStatusBarBackgroundColor] : backgroundColor;

  const insetStyle = {
    paddingTop: unsafe ? 0 : insets.top,
    paddingBottom: unsafeBottom ? 0 : insets.bottom,
  };

  return (
    <KeyboardAvoidingView style={[preset.outer, { backgroundColor }]} behavior={isIos ? "padding" : undefined} keyboardVerticalOffset={offsets[keyboardOffset || "none"]}>
      <StatusBar barStyle={statusBarStyle || "dark-content"} backgroundColor={statusBarBackgroundColor} />
      <View style={[preset.outer, { backgroundColor }, insetStyle]}>
        <ScrollView
          stickyHeaderIndices={stickyHeaderIndices}
          style={[
            preset.outer,
            {
              backgroundColor,
            },
          ]}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={[
            preset.inner,
            style,
            {
              paddingHorizontal: withHorizontalPadding ? 16 : 0,
            },
          ]}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps || "handled"}
        >
          {children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
