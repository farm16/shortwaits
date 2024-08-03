import { View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Space, Text } from "..";
import { useTheme } from "../../theme";
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

const textSizes = {
  normal: {
    title: "titleSmall",
    message: "textLarge",
  },
  small: {
    title: "textLarge",
    message: "text",
  },
} as const;

type MessageProps = {
  type: keyof typeof messageTypeToPreset;
  size?: keyof typeof textSizes;
  title?: string;
  message: string;
  style?: ViewStyle;
  hasShadow?: boolean;
  actionMessage?: string;
  onActionPress?: () => void;
};

export function Messages(props: MessageProps) {
  const { type, title, message, style, size = "normal", hasShadow = true, actionMessage, onActionPress } = props;
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
        },
        hasShadow && {
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
            <Text preset={textSizes[size].title} text={title} />
            <Space size="tiny" />
          </>
        ) : null}
        <Text
          preset={textSizes[size].message}
          style={{
            flexShrink: 1,
          }}
          text={message}
        />
        {actionMessage && onActionPress ? (
          <Text
            preset="text"
            style={{
              color: Colors[messageTypeToColor[type]],
              textDecorationLine: "underline",
              marginTop: 4,
              // alignSelf: "flex-end",
            }}
            text={actionMessage}
            onPress={onActionPress}
          />
        ) : null}
      </View>
    </View>
  );
}
