import { noop } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { Code, Camera as VisionCamera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import { BottomSheet, BottomSheetType, Button, ButtonCard, Messages, Space, Switch, Text, TextFieldCard, useBottomSheet } from "..";
import { getResponsiveFontSize, getResponsiveHeight, getResponsiveWidth } from "../../utils";

/**
 * todo: https://github.com/mrousavy/react-native-vision-camera/issues/2257
 */

type CameraProps = {
  onCodeScanned?: (codes: string) => void;
  options?: (keyof typeof _options)[];
};

const _options = {
  scanEventQr: {
    iconName: "calendar",
    title: "Event",
    description: "Add event to your calendar",
    regexp: /event/i,
    onScanBusinessEvent: noop,
  },
  scanClientQr: {
    iconName: "user",
    title: "Client",
    description: "Add client to your contacts",
    regexp: /client/i,
    onScanClient: noop,
  },
  scanBusinessQr: {
    iconName: "store",
    title: "Business",
    description: "Add business to your contacts",
    regexp: /business/i,
    onScanBusinessQr: noop,
  },
} as const;

export function QRScanner(props: CameraProps) {
  const { onCodeScanned, options } = props;
  const [manualValue, setManualValue] = useState<string>("");
  const [isManual, setIsManual] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isCameraWarningVisible, setIsCameraWarningVisible] = useState(false);
  const [codeType, setCodeType] = useState<keyof typeof _options>("scanEventQr");

  const device = useCameraDevice("back");
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);

  const handleCodeScanned = useCallback(
    (codes: Code[]) => {
      for (const code of codes) {
        console.log(`Code value: ${code.value}`);
      }
      onCodeScanned && onCodeScanned(codes[0].value ?? "");
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
      setIsCameraWarningVisible(true);
    }
  }, [device]);

  const renderCamera = useCallback(() => {
    if (!device) {
      return null;
    }
    return (
      <View style={styles.cameraViewContainer}>
        <VisionCamera style={styles.visionCamera} device={device} isActive={isCameraActive} codeScanner={codeScanner} />
        <Space />
      </View>
    );
  }, [codeScanner, device, isCameraActive]);

  const renderWarningMessage = useCallback(() => {
    if (isCameraWarningVisible) {
      return <Messages title="Camera Access Denied" message={"Enable camera access in your device settings."} type={"warning"} />;
    }
    return null;
  }, [isCameraWarningVisible]);

  return (
    <View style={styles.viewContainer}>
      {renderWarningMessage()}

      <Space />
      <Text preset="title2" text={isManual ? "Enter code manually" : "Scan QR"} />

      {isManual ? (
        <View>
          <TextFieldCard
            title={"Code"}
            placeholder="e.g. ABC-1234567"
            onChangeText={text => {
              setManualValue(text);
            }}
          />
          <ButtonCard
            title={"Type"}
            rightIconName="dots-vertical"
            subTitle={_options[codeType].title}
            // errors={!Array.isArray(business?.categories) || !business?.categories.length ? "this field is required" : undefined}
            // isTouched={isCategoriesTouched}
            onPress={() => {
              handleBottomSheet.expand();
            }}
          />

          <Button
            text={"Submit"}
            preset={manualValue ? "primary" : "primary-disabled"}
            disabled={manualValue ? false : true}
            style={{
              marginTop: getResponsiveHeight(24),
            }}
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
      <Space />
      <Text
        preset="text"
        style={{
          fontWeight: "400",
          fontSize: getResponsiveFontSize(16),
        }}
        text={`Note: ${isManual ? "Do not include blank spaces" : "Make sure the QR code is in the center of the screen"}`}
      />
      <BottomSheet ref={bottomSheetRef}>
        <View
          style={{
            padding: getResponsiveWidth(16),
          }}
        >
          <Text
            preset="titleMedium"
            style={{
              alignSelf: "center",
            }}
            text="Select an option to add"
          />
          <Space size="small" />
          <Divider />
          <Space size="small" />
          {options?.map(option => {
            return (
              <View key={option}>
                <ButtonCard
                  withTopBorder={true}
                  rightIconName="none"
                  preset="subLink"
                  title={_options[option].title}
                  subTitle={_options[option].description}
                  onPress={() => {
                    setCodeType(option);
                    handleBottomSheet.close();
                  }}
                />
                <Space size="small" />
                <Divider />
                <Space size="small" />
              </View>
            );
          })}
        </View>
      </BottomSheet>
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
});
