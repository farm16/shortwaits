import React from "react";
import { View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Space, Text } from "..";
import { ThemeColorName, useTheme } from "../../theme";
import { TextPresets } from "../../theme/presets";
import { getResponsiveHeight } from "../../utils";

const messageTypeToPreset = {
  error: "errorMessage",
  warning: "warningMessage",
  success: "successMessage",
  info: "infoMessage",
} as const;
const messageTypeToIconName = {
  error: "alert-circle",
  warning: "alert",
  success: "check-circle",
  info: "information",
} as const;
const messageTypeToColor = {
  error: "failed",
  warning: "warning",
  success: "success",
  info: "info",
} as const;

type MessageProps = {
  type: keyof typeof messageTypeToPreset;
  textColor?: ThemeColorName;
  title?: string;
  message: string;
  style?: ViewStyle;
};

export function Messages({ type, title, message, style, textColor = "text" }: MessageProps) {
  const { Colors } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.white,
          paddingHorizontal: getResponsiveHeight(12),
          paddingVertical: getResponsiveHeight(12),
          borderRadius: getResponsiveHeight(8),
          borderWidth: 1.5,
          borderColor: Colors[messageTypeToColor[type]],
        },
        style,
      ]}
    >
      <Icon name={messageTypeToIconName[type]} size={26} color={Colors[messageTypeToColor[type]]} />
      <Space direction="vertical" size="small" />
      <View
        style={{
          flex: 1,
        }}
      >
        {title ? (
          <>
            <Text
              preset={"titleSmall"}
              style={{
                color: Colors[textColor],
              }}
              text={title}
            />
            <Space size="tiny" />
          </>
        ) : null}
        <Text
          preset={messageTypeToPreset[type] as TextPresets}
          style={{
            color: Colors[textColor],
            flexShrink: 1,
          }}
          text={message}
        />
      </View>
    </View>
  );
}
