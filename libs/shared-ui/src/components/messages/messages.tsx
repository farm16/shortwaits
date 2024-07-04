import { View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Space, Text } from "..";
import { ThemeColorName, useTheme } from "../../theme";
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
          backgroundColor: Colors[`${messageTypeToColor[type]}Background`],
          paddingHorizontal: getResponsiveHeight(12),
          paddingVertical: getResponsiveHeight(12),
          borderRadius: getResponsiveHeight(8),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          elevation: 3,
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
            <Text preset={"titleSmall"} text={title} />
            <Space size="tiny" />
          </>
        ) : null}
        <Text
          preset="textLarge"
          style={{
            flexShrink: 1,
          }}
          text={message}
        />
      </View>
    </View>
  );
}
