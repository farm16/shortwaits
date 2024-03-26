import { noop } from "lodash";
import React, { FC, useCallback, useLayoutEffect } from "react";
import { IconButton, QRScanner, Text, WithPermission, useTheme } from "../../..";
import { ModalsScreenProps } from "../../../navigation";

const _options = {
  scanEventQr: {
    iconName: "calendar",
    title: "Event",
    onScanBusinessEvent: noop,
  },
  scanClientQr: {
    iconName: "user",
    title: "Client",
    onScanClient: noop,
  },
  scanBusinessQr: {
    iconName: "store",
    title: "Business",
    onScanBusinessQr: noop,
  },
} as const;

export type QrScannerOptions = keyof typeof _options;

export const QrScannerModal: FC<ModalsScreenProps<"qr-scanner-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;
  const onDismiss = params?.onDismiss ?? noop;
  const title = params?.title ?? "";
  const description = params?.description ?? "";
  const options = params?.options ?? [];

  const { Colors } = useTheme();

  const isMultipleOptions = options.length > 1;
  console.log("QR Scanner Modal options >>>", options);

  const handleSubmit = useCallback(
    (codeValue: string) => {
      console.log("QR code value >>>", codeValue);
      onSubmit && onSubmit();
    },
    [onSubmit]
  );

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

  return (
    <WithPermission permission="camera" onDenied={handleGoBack}>
      <Text preset="text" text={description} />
      {/* {isMultipleOptions && (
        <Text
          preset="title"
          style={{
            alignSelf: "center",
          }}
          text="Select an option to scan"
        />
      )}
      {isMultipleOptions ? (
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            padding: 16,
          }}
        >
          {options.map(option => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.brandAccent2,
                  height: getResponsiveHeight(150),
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                  borderRadius: 8,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  flex: 2,
                }}
                key={option}
              >
                <Icon name={_options[option].iconName} size={40} color={Colors.brandSecondary} />
                <Space size="tiny" />
                <Text
                  preset="title"
                  style={{
                    color: Colors.brandSecondary,
                  }}
                  text={_options[option].title}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <QRScanner onCodeScanned={handleSubmit} />
      )} */}

      <QRScanner onCodeScanned={handleSubmit} options={options} />
    </WithPermission>
  );
};
