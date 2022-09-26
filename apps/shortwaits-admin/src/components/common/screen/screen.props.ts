import React from "react";
import { ColorValue, StyleProp, ViewStyle } from "react-native";
import { KeyboardOffsets, ScreenPresets } from "./screen.presets";

export interface ScreenProps {
  header?: JSX.Element;
  /**
   * Apply inset (padding) to the screen
   */
  withInset?: boolean;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  statusBarBackgroundColor?: ColorValue;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets;

  /**
   * An optional background color
   */
  backgroundColor?: string;

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBar?: "light-content" | "dark-content";

  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean;

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets;

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never";
}
