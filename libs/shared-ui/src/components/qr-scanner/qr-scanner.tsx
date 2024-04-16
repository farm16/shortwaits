import React, { FC, Fragment, useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Code, Camera as VisionCamera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import { Button, Messages, Space, Switch, Text, TextFieldCard, WithPermission } from "../../components";
import { getResponsiveFontSize, getResponsiveHeight, getResponsiveWidth } from "../../utils";

const scanTypes = {
  scanEventQr: {
    iconName: "calendar",
    title: "Add event",
    instructions: {
      manually: "Enter event code",
      manuallyButtonText: "Submit",
      scan: "Scan event QR code",
    },
    regexp: /event/i,
  },
  scanClientQr: {
    iconName: "user",
    title: "Add client",
    instructions: {
      manually: "Enter client code",
      scan: "Scan client QR code",
    },
    regexp: /client/i,
  },
  scanBusinessQr: {
    iconName: "store",
    title: "Add Business",
    instructions: {
      manually: "Enter business code",
      scan: "Scan business QR code",
    },
    regexp: /business/i,
  },
} as const;

export type QrScannerTypes = keyof typeof scanTypes;

export type QrScannerModalProps = {
  preset: QrScannerTypes;
  title?: string;
  onDenied?: () => void;
  onSubmit?: (codeString?: string) => void;
};

/**
 * todo: https://github.com/mrousavy/react-native-vision-camera/issues/2257
 */
export const QrScanner: FC<QrScannerModalProps> = props => {
  const { onSubmit, onDenied, title, preset } = props;

  const [manualValue, setManualValue] = useState<string>("");
  const [isManual, setIsManual] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraWarningVisible, setIsCameraWarningVisible] = useState(false);
  const device = useCameraDevice("back");

  const handleCode = useCallback(
    async (codes: Code[]) => {
      console.log("QR codes received >>>", codes);
      for (const code of codes) {
        console.log("QR code value >>>", code);
        // todo: check if the code matches the regexp
        // if this is a manual input, we need to check for manual regexp
        // else if this comes from the camera, we need to check for camera regexp which handles a url
        const codeString = code?.value; // will always return a string ex. "ABC123" or undefined
        onSubmit && onSubmit(codeString);
      }
    },
    [onSubmit]
  );

  const handleDenied = useCallback(() => {
    onDenied && onDenied();
  }, [onDenied]);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: handleCode,
  });

  useLayoutEffect(() => {
    if (device) {
      setIsCameraActive(true);
    }
    if (!device) {
      setIsManual(true);
      setIsCameraActive(false);
      setIsCameraWarningVisible(true);
    }
    return () => {
      if (device) {
        setIsCameraActive(false);
      }
    };
  }, [device]);

  console.log("QR Scanner Modal type >>>", preset);

  const renderCamera = useCallback(() => {
    if (!device) {
      return null;
    }
    return (
      <View style={styles.cameraViewContainer}>
        <VisionCamera style={styles.visionCamera} device={device} isActive={isCameraActive} codeScanner={codeScanner} />
        <Space />
        <Text preset="text" style={styles.noteText} text={`Note: ${isManual ? "Do not include blank spaces" : "Make sure the QR code is in the center of the screen"}`} />
      </View>
    );
  }, [codeScanner, device, isCameraActive, isManual]);

  const renderWarningMessage = useCallback(() => {
    if (isCameraWarningVisible) {
      return (
        <Fragment>
          <Messages title="Camera Access Denied" message={"Enable camera access in your device settings."} type={"warning"} />
          <Space />
        </Fragment>
      );
    }
    return null;
  }, [isCameraWarningVisible]);

  const handleManualSubmit = useCallback(() => {
    handleCode([
      {
        value: manualValue,
        type: "qr",
      },
    ]);
  }, [handleCode, manualValue]);

  if (!preset) {
    return null;
  }

  return (
    <WithPermission permission="camera" onDenied={handleDenied} style={styles.viewContainer}>
      {renderWarningMessage()}
      <Text preset="title" text={title ?? ""} />
      {isManual ? (
        <View>
          <TextFieldCard
            title={"Code"}
            placeholder="e.g. ABC123"
            onChangeText={text => {
              setManualValue(text);
            }}
          />
          <Text preset="text" style={styles.noteText} text={`Note: ${isManual ? "Do not include blank spaces" : "Make sure the QR code is in the center of the screen"}`} />
          <Button
            text={"Submit"}
            preset={manualValue ? "primary" : "primary-disabled"}
            disabled={manualValue ? false : true}
            style={styles.noteButton}
            onPress={handleManualSubmit}
          />
        </View>
      ) : (
        renderCamera()
      )}
      <Space />
      {isCameraActive ? (
        <View style={styles.disableManualInputContainer}>
          <Text style={styles.disableText} text={isManual ? "Disable manual input" : "Enable manual input"} />
          <Switch
            disabled={!isCameraActive}
            value={isManual}
            onValueChange={() => {
              setIsManual(s => !s);
            }}
          />
        </View>
      ) : null}
    </WithPermission>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: getResponsiveWidth(16),
  },
  visionCamera: {
    flex: 1,
  },
  cameraViewContainer: {
    height: getResponsiveHeight(300),
    borderRadius: 15,
  },
  disableManualInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  disableText: {
    fontWeight: "600",
  },
  noteText: {
    fontWeight: "400",
    fontSize: getResponsiveFontSize(12),
  },
  noteButton: {
    marginTop: getResponsiveHeight(24),
  },
});
