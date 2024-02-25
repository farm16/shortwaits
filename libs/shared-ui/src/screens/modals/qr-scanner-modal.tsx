import { noop } from "lodash";
import React, { FC, useCallback, useLayoutEffect } from "react";
import { BackButton, QRScanner, Text, WithPermission } from "../../";
import { ModalsScreenProps } from "../../navigation";

export const QrScannerModal: FC<ModalsScreenProps<"qr-scanner-modal-screen">> = ({ navigation, route }) => {
  const params = route?.params;
  const onSubmit = params?.onSubmit ?? noop;
  const onDismiss = params?.onDismiss ?? noop;
  const title = params?.title ?? "";
  const description = params?.description ?? "";

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
      headerLeft: () => <BackButton onPress={handleGoBack} />,
      headerTitle: () => <Text preset="text" text={title} />,
    });
  }, [handleGoBack, navigation, title]);

  return (
    <WithPermission permission="camera" onDenied={handleGoBack}>
      <Text preset="text" text={description} />
      <QRScanner onCodeScanned={handleSubmit} />
    </WithPermission>
  );
};
