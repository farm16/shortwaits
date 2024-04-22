import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { IconButton, Messages } from "..";
import { useTheme } from "../../theme";
import { getResponsiveFontSize, getResponsiveHeight, getResponsiveWidth } from "../../utils";
import { Space, Text } from "../common";

type QrModalProps = {
  isVisible: boolean;
  value: string;
  title: string;
  description?: JSX.Element | string;
  warningMessage?: string;
  setIsVisible: (isVisible: boolean) => void;
};

export const QrModal: FC<QrModalProps> = props => {
  const { isVisible, setIsVisible, value, title, description, warningMessage } = props;
  const { Colors } = useTheme();

  return (
    <Portal>
      <Modal visible={isVisible} dismissable={false}>
        <View
          style={[
            {
              backgroundColor: Colors.lightBackground,
            },
            styles.modal,
          ]}
        >
          <View style={styles.exit}>
            <IconButton
              iconColor="brandSecondary"
              iconType="close"
              onPress={() => {
                setIsVisible(false);
              }}
            />
          </View>
          {warningMessage && (
            <Messages
              style={{
                marginTop: getResponsiveHeight(12),
                marginBottom: getResponsiveHeight(12),
              }}
              type="info"
              message={warningMessage}
            />
          )}
          <Text
            preset="title"
            style={[
              {
                color: Colors.text,
              },
              styles.title,
            ]}
          >
            {title}
          </Text>
          <View style={{ alignSelf: "center" }}>
            <QRCode value={value} size={200} />
          </View>
          <Space />
          <Text preset="titleSmall">{description}</Text>
          <Space />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: getResponsiveWidth(16),
    alignSelf: "center",
    borderRadius: getResponsiveHeight(16),
    padding: getResponsiveHeight(16),
  },
  exit: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  title: {
    marginBottom: getResponsiveHeight(16),
    fontSize: getResponsiveFontSize(18),
    alignSelf: "center",
  },
});
