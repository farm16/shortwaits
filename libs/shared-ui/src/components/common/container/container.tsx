import * as React from "react";
import { View as ReactNativeView, StyleSheet, ViewProps, ViewStyle } from "react-native";

import { getResponsiveHeight } from "libs/shared-ui/src/utils";
// ctv5y
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
interface ContainerPropTypes {
  direction?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  withHorizontalPadding?: boolean;
}
export function Container(props: ContainerPropTypes & ViewProps) {
  // grab the props
  const {
    // preset = "default",
    children,
    direction = "column",
    alignItems = "flex-start",
    justifyContent = "flex-start",
    style: styleOverride,
    ...rest
  } = props;

  // figure out which content to use
  // const i18nText = tx && translate(tx, txOptions);
  // const content = i18nText || text || children;

  const style = StyleSheet.create({
    default: {
      flexDirection: direction,
      alignItems: alignItems,
      justifyContent: justifyContent,
      paddingHorizontal: props.withHorizontalPadding ? getResponsiveHeight(16) : 0,
    },
  });

  const containerStyle = [style.default, styleOverride];

  return (
    <ReactNativeView {...rest} style={containerStyle}>
      {children}
    </ReactNativeView>
  );
}
