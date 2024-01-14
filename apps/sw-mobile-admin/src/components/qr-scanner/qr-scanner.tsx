import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Code, Camera as VisionCamera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import { Button, Space, Switch, Text, TextFieldCard } from "..";
import { getFontSize, getResponsiveHeight, getResponsiveWidth } from "../../utils";

/**
 * todo: https://github.com/mrousavy/react-native-vision-camera/issues/2257
 */

type CameraProps = {
  onCodeScanned?: (codes: string) => void;
};

export function QRScanner(props: CameraProps) {
  const { onCodeScanned } = props;
  const [manualValue, setManualValue] = useState<string>("");
  const [isManual, setIsManual] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);

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
      if (device) {
        setIsCameraActive(false);
      }
    };
  }, [device]);

  useEffect(() => {
    console.log("device >>>", device);
    if (!device) {
      setIsManual(true);
      setIsCameraActive(false);
    }
  }, [device]);

  const renderCamera = useCallback(() => {
    if (!device) {
      return null;
    }
    return (
      <View style={styles.cameraViewContainer}>
        <VisionCamera style={styles.visionCamera} device={device} isActive={isCameraActive} codeScanner={codeScanner} />
        {/* </View> */}
        <Space />
      </View>
    );
  }, [codeScanner, device, isCameraActive]);

  return (
    <View style={styles.viewContainer}>
      <Space />
      <Text preset="title2" text={isManual ? "Enter Manually" : "Scan QR"} />

      {isManual ? (
        <View>
          <TextFieldCard
            title={"ID"}
            placeholder="Enter the client's ID"
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
        renderCamera()
      )}
      <Space />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "600",
          }}
          text={isManual ? "Disable manual input" : "Enable manual input"}
        />
        <Switch
          disabled={!isCameraActive}
          value={isManual}
          onValueChange={() => {
            setIsManual(s => !s);
          }}
        />
      </View>
      {isCameraActive ? null : <Text preset="failed" text={device ? "camera is not available" : "Camera is not available, please enable camera access in your device settings"} />}
      <Space />
      <Text
        preset="subText"
        style={{
          fontWeight: "400",
          fontSize: getFontSize(16),
        }}
        text={`Note: ${isManual ? "Do not include blank spaces" : "Make sure the QR code is in the center of the screen"}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: getResponsiveWidth(16),
  },
  visionCamera: {
    flex: 1,
  },
  cameraViewContainer: {
    // flex: 1,
    // width: getResponsiveHeight(300),
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
