/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { TextStyle } from "react-native";
import EmojiData from "emoji-datasource/emoji.json";

import { Text } from "../common";
import { EmojiType } from "./tools";

type EmojiProps = {
  name: EmojiType;
  size?: number;
  style?: TextStyle;
};

export function Emoji({ name, size = 15, style: styleOverride }: EmojiProps) {
  console.log("Emoji >>>", name);
  const charFromUtf16 = utf16 =>
    String.fromCodePoint(...utf16.split("-").map(u => "0x" + u));

  const emojis = (function () {
    return charFromUtf16(
      EmojiData.find(emoji => emoji.short_name === name).unified
    );
  })();

  return (
    <Text
      preset="none"
      style={[{ fontSize: size, textAlign: "center" }, styleOverride]}
    >
      {emojis ?? ""}
    </Text>
  );
}
