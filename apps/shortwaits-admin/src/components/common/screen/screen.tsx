import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "../../../theme";
import { ScreenProps } from "./screen.props";
import { isNonScrolling, offsets, presets } from "./screen.presets";
import { Text } from "../text/text";
const isIos = Platform.OS === "ios";

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const style = props.style || {};
  const { Colors } = useTheme();
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : { backgroundColor: Colors.background };
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar
        barStyle={props.statusBar || "dark-content"}
        backgroundColor={props.statusBarBackgroundColor}
      />
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const {
    backgroundColor,
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
  const { Colors } = useTheme();
  const backgroundStyle = backgroundColor
    ? { backgroundColor: backgroundColor }
    : { backgroundColor: Colors.background };
  const insetStyle = {
    paddingTop: unsafe ? 0 : insets.top,
    paddingBottom: unsafeBottom ? 0 : insets.bottom,
  };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[keyboardOffset || "none"]}
    >
      <StatusBar
        barStyle={statusBar || "dark-content"}
        backgroundColor={Colors.background}
      />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          stickyHeaderIndices={stickyHeaderIndices}
          style={[preset.outer, backgroundStyle]}
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
