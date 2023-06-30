import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "../../../theme";
import { ScreenProps } from "./screen.props";
import { isNonScrolling, offsets, presets } from "./screen.presets";

const isIos = Platform.OS === "ios";

function ScreenWithoutScrolling(props: ScreenProps) {
  const {
    backgroundColor: overrideBackgroundColor,
    keyboardOffset,
    statusBar,
    children,
    style: styleOverride,
    unsafe,
    unsafeBottom,
  } = props;

  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const style = styleOverride || {};
  const {
    Colors: { backgroundOverlay: defaultBackgroundColor },
  } = useTheme();
  const backgroundColor = overrideBackgroundColor
    ? overrideBackgroundColor
    : style?.backgroundColor
    ? style.backgroundColor
    : defaultBackgroundColor;

  const insetStyle = {
    paddingTop: unsafe ? 0 : insets.top,
    paddingBottom: unsafeBottom ? 0 : insets.bottom,
  };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, { backgroundColor }]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[keyboardOffset || "none"]}
    >
      <StatusBar
        barStyle={statusBar || "dark-content"}
        backgroundColor={backgroundColor}
      />
      <View style={[preset.inner, style, insetStyle]}>{children}</View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const {
    backgroundColor: overrideBackgroundColor,
    keyboardOffset,
    keyboardShouldPersistTaps,
    statusBar,
    children,
    style: styleOverride,
    unsafe,
    unsafeBottom,
    stickyHeaderIndices,
    showsVerticalScrollIndicator = false,
  } = props;
  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const style = styleOverride || {};
  const {
    Colors: { background: defaultBackgroundColor },
  } = useTheme();

  const backgroundColor = overrideBackgroundColor
    ? overrideBackgroundColor
    : style?.backgroundColor
    ? style.backgroundColor
    : defaultBackgroundColor;

  const insetStyle = {
    paddingTop: unsafe ? 0 : insets.top,
    paddingBottom: unsafeBottom ? 0 : insets.bottom,
  };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, { backgroundColor }]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[keyboardOffset || "none"]}
    >
      <StatusBar
        barStyle={statusBar || "dark-content"}
        backgroundColor={backgroundColor}
      />
      <View style={[preset.outer, { backgroundColor }, insetStyle]}>
        <ScrollView
          stickyHeaderIndices={stickyHeaderIndices}
          style={[preset.outer, { backgroundColor }]}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={[preset.inner, style]}
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
