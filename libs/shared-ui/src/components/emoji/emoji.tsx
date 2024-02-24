import { EmojiType } from "@shortwaits/shared-lib";
import React from "react";
import { TextStyle } from "react-native";

import { getEmojiString } from "../../utils";
import { Text } from "../common";

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
