import { Portal } from "@gorhom/portal";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modal } from "react-native-paper";
import { Code, Camera as VisionCamera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import { Button, IconButton, Space, Switch, Text, TextFieldCard } from "..";
import { useTheme } from "../../theme";
import { getFontSize, getResponsiveHeight, getResponsiveWidth } from "../../utils";

type CameraProps = {
  onClose: () => void;
  onCodeScanned?: (codes: string) => void;
};
export function Camera(props: CameraProps) {
  const { onClose, onCodeScanned } = props;
  const [manualValue, setManualValue] = useState<string>("");
  const [isManual, setIsManual] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const { Colors } = useTheme();

  const device = useCameraDevice("back");

  const handleCodeScanned = useCallback(
    (codes: Code[]) => {
      for (const code of codes) {
        console.log(`Code value: ${code.value}`);
      }
      onCodeScanned && onCodeScanned(codes[0].value);
    },
    [onCodeScanned]
  );

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: handleCodeScanned,
  });

  useEffect(() => {
    return () => {
      setIsCameraActive(false);
    };
  }, []);

  if (!device) {
    return null;
  }

  return (
    <Portal>
      <Modal visible={true} dismissable={false}>
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
              iconType="close"
              onPress={() => {
                onClose && onClose();
              }}
            />
          </View>
          {isManual ? (
            <View style={{ paddingHorizontal: getResponsiveWidth(16), alignItems: "center" }}>
              <TextFieldCard
                title={"ID"}
                placeholder="Enter the clients ID"
                onChangeText={text => {
                  setManualValue(text);
                }}
              />
              <Space size="tiny" />
              <Button
                text={"Submit"}
                preset={manualValue ? "primary" : "primary-disabled"}
                disabled={manualValue ? false : true}
                onPress={() => {
                  handleCodeScanned([
                    {
                      value: manualValue,
                      type: "qr",
                    },
                  ]);
                }}
              />
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
