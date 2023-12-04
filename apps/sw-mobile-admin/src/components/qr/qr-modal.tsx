import { Portal } from "@gorhom/portal";
import React, { FC } from "react";
import { View } from "react-native";
import { Modal } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { IconButton } from "..";
import { useTheme } from "../../theme";
import { getFontSize } from "../../utils";
import { Space, Text } from "../common";

type QrModalProps = {
  isVisible: boolean;
  value: string;
  title: string;
  description?: JSX.Element | string;
  description2?: string;
  setIsVisible: (isVisible: boolean) => void;
};
export const QrModal: FC<QrModalProps> = props => {
  const { isVisible, setIsVisible, value, title, description, description2 } = props;
  const { Colors } = useTheme();

  return (
    <Portal>
      <Modal visible={isVisible} dismissable={false}>
        <View
          style={{
            backgroundColor: Colors.lightBackground,
            width: "90%",
            alignSelf: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          <IconButton
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
            }}
            iconType="close"
            onPress={() => {
              setIsVisible(false);
            }}
          />
          <Text
            preset="none"
            style={{
              color: Colors.text,
              fontWeight: "600",
              marginTop: 20,
              marginBottom: 20,
              width: "90%",
              textAlign: "center",
              fontSize: getFontSize(18),
            }}
          >
            {title}
          </Text>
          <QRCode value={value} size={200} />
          <Space size="large" />
          <Text
            preset="none"
            style={{
              color: Colors.text,
              fontWeight: "400",
              textAlign: "center",
              paddingHorizontal: 16,
              fontSize: getFontSize(16),
            }}
          >
            {description}
          </Text>
          <Space size="large" />
          <Text
            preset="none"
            style={{
              color: Colors.subText,
              fontWeight: "400",
              textAlign: "center",
              paddingHorizontal: 16,
              fontSize: getFontSize(14),
            }}
          >
            {description2}
          </Text>
          <Space size="xLarge" />
        </View>
      </Modal>
    </Portal>
  );
};
