import React from "react";
import { ScrollViewProps, StatusBarStyle, ViewStyle } from "react-native";
import { ThemeColorName } from "../../../theme/Colors";
import { KeyboardOffsets, ScreenPresets } from "./screen.presets";

export interface ScreenProps extends ScrollViewProps {
  header?: JSX.Element;

  /**
   * Apply inset (padding) to the screen
   */
  withInset?: boolean;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle;

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets;

  /**
   * An optional background color
   */
  backgroundColor?: ThemeColorName;

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBarStyle?: StatusBarStyle | null | undefined;

  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean;
  unsafeBottom?: boolean;
  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets;

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never";

  showsVerticalScrollIndicator?: boolean;

  withHorizontalPadding?: boolean;

  withVerticalPadding?: boolean;

  statusBarBackgroundColor?: ThemeColorName;
}
