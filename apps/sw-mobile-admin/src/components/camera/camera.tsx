import { Portal } from "@gorhom/portal";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modal } from "react-native-paper";
import { Camera as VisionCamera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import { IconButton, Space, Switch, Text, TextFieldCard } from "..";
import { useTheme } from "../../theme";
import { getFontSize, getResponsiveHeight, getResponsiveWidth } from "../../utils";

type CameraProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onCodeScanned?: (codes: any) => void;
};
export function Camera(props: CameraProps) {
  const { isVisible, setIsVisible, onCodeScanned } = props;
  const [isManual, setIsManual] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { Colors } = useTheme();

  const device = useCameraDevice("back");
  console.log("device", device);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      for (const code of codes) {
        console.log(code.value);
      }
      onCodeScanned && onCodeScanned(codes);
      setIsVisible(false);
    },
  });

  useEffect(() => {
    if (isVisible) {
      setIsCameraActive(true);
    } else {
      setIsCameraActive(false);
    }
    return () => {
      setIsCameraActive(false);
    };
  }, [isVisible]);

  if (!device) {
    return null;
  }

  return (
    <Portal>
      <Modal visible={isVisible} dismissable={false}>
        <View
          style={[
            styles.viewContainer,
            {
              backgroundColor: Colors.white,
            },
          ]}
        >
          <Space />
          <Text preset="title2" text={isManual ? "Enter Manually" : "Scan QR"} />
          <Space />
          <View style={styles.closeButton}>
            <IconButton
              // color={Colors.brandSecondary}
              iconType="close"
              onPress={() => {
                setIsVisible(false);
              }}
            />
          </View>
          {isManual ? (
            <View style={{ paddingHorizontal: getResponsiveWidth(16) }}>
              <TextFieldCard title={"ID"} placeholder="Enter the clients ID" />
            </View>
          ) : (
            <View style={styles.cameraViewContainer}>
              <VisionCamera style={styles.visionCamera} device={device} isActive={isCameraActive} codeScanner={codeScanner} />
            </View>
          )}
          <Space />
          <View
            style={{
              paddingHorizontal: getResponsiveWidth(16),
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                }}
                text={isManual ? "Disable manual input" : "Enable manual input"}
              />
              <Switch
                value={isManual}
                onValueChange={() => {
                  setIsManual(s => !s);
                }}
              />
            </View>
            <Text
              style={{
                fontWeight: "400",
                fontSize: getFontSize(16),
              }}
              text={`Note: ${isManual ? "Do not enter spaces" : "Make sure the QR code is in the center of the screen"}`}
            />
          </View>
          <Space />
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  visionCamera: {
    flex: 1,
  },
  viewContainer: {
    //width: "95%",
    marginHorizontal: getResponsiveWidth(16),
    borderRadius: 15,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraViewContainer: {
    width: getResponsiveHeight(300),
    height: getResponsiveHeight(300),
    borderRadius: 15,
  },
  closeButton: {
    position: "absolute",
    width: getResponsiveHeight(40),
    height: getResponsiveHeight(40),
    borderRadius: getResponsiveHeight(40) / 2,
    top: getResponsiveHeight(15),
    right: getResponsiveHeight(15),
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
