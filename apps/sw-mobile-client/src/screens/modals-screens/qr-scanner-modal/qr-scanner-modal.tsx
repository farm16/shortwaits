/* eslint-disable @nx/enforce-module-boundaries */
import { IconButton, QrScanner, Text } from "@shortwaits/shared-ui";
import { noop } from "lodash";
import React, { FC, useCallback, useLayoutEffect } from "react";
import { ModalsScreenProps } from "../../../navigation";
import { useLazyGetEventDetailsForClientQuery } from "../../../services";

const scanTypes = {
  scanEventQr: {
    iconName: "calendar",
    title: "Add event",
    instructions: {
      manually: "Enter event code",
      manuallyButtonText: "Submit",
      scan: "Scan event QR code",
    },
    useGetCodeData: useLazyGetEventDetailsForClientQuery,
    onSuccess: (code?: string, navigation?: ModalsScreenProps<"qr-scanner-modal-screen">["navigation"]) => {
      navigation?.navigate("authorized-tab", {
        screen: "home-screen",
      });
      console.log("Event code received >>>", code);
    },
    regexp: /event/i,
    onScanBusinessEvent: noop,
  },
  scanClientQr: {
    iconName: "user",
    title: "Add client",
    instructions: {
      manually: "Enter client code",
      scan: "Scan client QR code",
    },
    onSuccess: (code?: string, navigation?: ModalsScreenProps<"qr-scanner-modal-screen">["navigation"]) => {
      console.log("Event code received >>>", code);
    },
    regexp: /client/i,
    onScanClient: noop,
  },
  scanBusinessQr: {
    iconName: "store",
    title: "Add Business",
    instructions: {
      manually: "Enter business code",
      scan: "Scan business QR code",
    },
    onSuccess: (code?: string, navigation?: ModalsScreenProps<"qr-scanner-modal-screen">["navigation"]) => {
      console.log("Event code received >>>", code);
    },
    regexp: /business/i,
    onScanBusinessQr: noop,
  },
} as const;

export type QrScannerTypes = keyof typeof scanTypes;

/**
 * todo: https://github.com/mrousavy/react-native-vision-camera/issues/2257
 */
export const QrScannerModal: FC<ModalsScreenProps<"qr-scanner-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;

  const onSubmit = params?.onSubmit ?? noop;
  const onDismiss = params?.onDismiss ?? noop;
  const title = params?.title ?? "";
  const type = params?.type ?? "";

  const handleGoBack = useCallback(() => {
    onDismiss && onDismiss();
    navigation.goBack();
  }, [navigation, onDismiss]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => <IconButton withMarginRight iconType="close" onPress={handleGoBack} />,
      headerTitle: () => <Text preset="headerTitle" text={title ?? ""} />,
    });
  }, [handleGoBack, navigation, title]);

  return <QrScanner preset={"scanEventQr"} title={title} onDismiss={onDismiss} onSubmit={onSubmit} />;
};
