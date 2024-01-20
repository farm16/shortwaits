import React from "react";
import { TextStyle } from "react-native";
import { EmojiType } from "@shortwaits/shared-utils";

import { Text } from "../common";
import { getEmojiString } from "../../utils";

type EmojiProps = {
  name: EmojiType;
  size?: number;
  style?: TextStyle;
};

export function Emoji({ name, size = 15, style: styleOverride }: EmojiProps) {
  const emoji = getEmojiString(name);
  return (
    <Text preset="none" style={[{ fontSize: size, textAlign: "center" }, styleOverride]}>
      {emoji}
    </Text>
  );
}
