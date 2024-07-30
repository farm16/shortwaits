import { ForwardedRef, forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../../theme";
import { getResponsiveHeight } from "../../utils";
import { BottomSheet, BottomSheetType, Space, Text } from "../common";
import { Messages } from "../messages/messages";

type QrBottomSheetProps = {
  value: string;
  title: string;
  description?: JSX.Element | string;
  warningMessage?: string;
  // setIsVisible: (isVisible: boolean) => void;
};

export const QrBottomSheet = forwardRef((props: QrBottomSheetProps, ref: ForwardedRef<BottomSheetType | null>) => {
  const { value, title, description, warningMessage } = props;
  const { Colors } = useTheme();

  return (
    <BottomSheet ref={ref} snapPointsLevel={2}>
      <ScrollView style={[styles.container]}>
        <Text preset="title" style={[styles.title]} text={title} />
        <Space />
        <Text preset="textLargeBold" style={[styles.title]}>
          {description}
        </Text>
        <View style={{ alignSelf: "center" }}>
          <Space />
          <QRCode value={value} size={200} />
          <Space />
        </View>
        {warningMessage && (
          <Messages
            style={{
              marginBottom: getResponsiveHeight(12),
            }}
            type="info"
            size="small"
            message={warningMessage}
          />
        )}
        <Space />
      </ScrollView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: getResponsiveHeight(16),
  },
  exit: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
  },
});
