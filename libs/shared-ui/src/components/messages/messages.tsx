import React from "react";
import { View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "..";
import { useTheme } from "../../theme";

const messageTypeToPreset = {
  error: "errorMessage",
  warning: "warningMessage",
  success: "successMessage",
} as const;
const messageTypeToIconName = {
  error: "alert-circle",
  warning: "alert",
  success: "check-circle",
} as const;
const messageTypeToColor = {
  error: "error",
  warning: "warning",
  success: "success",
} as const;

type MessageProps = {
  type: keyof typeof messageTypeToPreset;
  message: string;
  style?: ViewStyle;
};

export function Messages({ type, message, style }: MessageProps) {
  const { Colors } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Icon name={messageTypeToIconName[type]} size={20} color={Colors[messageTypeToColor[type]]} />
      <Text preset={messageTypeToPreset[type]} text={message} />
    </View>
  );
}
