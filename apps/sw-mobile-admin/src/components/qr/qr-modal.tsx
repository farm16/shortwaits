import QRCode from "react-native-qrcode-svg";

import { Portal } from "@gorhom/portal";
import React, { FC } from "react";
import { View } from "react-native";
import { Modal } from "react-native-paper";
import { useTheme } from "../../theme";
import { Text } from "../common";
import { getResponsiveFontSize } from "../../utils";
import { IconButton } from "..";

type QrModalProps = {
  isVisible: boolean;
  value: string;
  title: string;
  description?: string;
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
            backgroundColor: Colors.backgroundOverlay,
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
              fontSize: getResponsiveFontSize(18),
            }}
          >
            {title}
          </Text>
          <QRCode value={value} size={200} />
          <Text
            preset="none"
            style={{
              color: Colors.text,
              fontWeight: "400",
              marginTop: 20,
              marginBottom: 20,
              width: "90%",
              textAlign: "center",
              fontSize: getResponsiveFontSize(16),
            }}
          >
            {description}
          </Text>
          <Text
            preset="none"
            style={{
              color: Colors.subText,
              fontWeight: "400",
              marginTop: 8,
              marginBottom: 20,
              width: "90%",
              textAlign: "center",
              fontSize: getResponsiveFontSize(14),
            }}
          >
            {description2}
          </Text>
        </View>
      </Modal>
    </Portal>
  );
};
