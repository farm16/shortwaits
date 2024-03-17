import { truncate } from "lodash";
import * as React from "react";
import { Text as ReactNativeText } from "react-native";
import { useTheme } from "../../../theme";
import { TextProps } from "./text-types";
// ctv5y
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    //txOptions,
    preset = "default",
    iText,
    text,
    children,
    style: styleOverride,
    length,
    ...rest
  } = props;
  const {
    Common: { textPresets },
  } = useTheme();
  // figure out which content to use
  // const i18nText = tx && translate(tx, txOptions);
  // const content = i18nText || text || children;
  let content = text || children;

  const style = textPresets[preset] || textPresets.default;
  const textStyle = [style, styleOverride];

  if (length && typeof content === "string" && content.length > length) {
    content = truncate(content, { length });
  }

  return (
    <ReactNativeText {...rest} style={textStyle}>
      {content}
    </ReactNativeText>
  );
}
