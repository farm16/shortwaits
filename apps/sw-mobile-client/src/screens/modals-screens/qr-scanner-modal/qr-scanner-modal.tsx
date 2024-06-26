/* eslint-disable @nx/enforce-module-boundaries */
import { IconButton, QrScanner, Text } from "@shortwaits/shared-ui";
import { noop } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
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
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => <IconButton iconColor="brandSecondary" iconType="close" withMarginRight onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={"Event QR Scanner"} />,
      headerStyle: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowColor: "transparent",
      },
    });
  }, [navigation, handleGoBack]);

  const [trigger, status] = useLazyGetEventDetailsForClientQuery();

  const handleSubmit = async (eventCode: string) => {
    console.log("QR code submitted", eventCode);
    if (eventCode) {
      await trigger({ shortEventId: eventCode });
    }
  };

  useEffect(() => {
    if (status.isSuccess && status?.data?.data) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "authorized-tab",
          },
          {
            name: "authorized-stack",
            params: {
              screen: "event-details-screen",
              params: {
                event: status.data.data,
              },
            },
          },
        ],
      });
    }
    if (status.isError) {
      Alert.alert("Error", "Invalid event code");
      console.log("status.error", status.error);
    }
  }, [navigation, status?.data?.data, status]);

  if (status.isLoading) {
    return <ActivityIndicator />;
  }
  return <QrScanner preset={"scanEventQr"} title={"Enter event code"} onSubmit={handleSubmit} onDenied={handleGoBack} />;
};
