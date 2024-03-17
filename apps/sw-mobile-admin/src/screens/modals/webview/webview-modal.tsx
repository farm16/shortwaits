import { BackButton, Screen, Text } from "@shortwaits/shared-ui";
import { noop } from "lodash";
import React, { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { ModalsScreenProps } from "../../../navigation";

export const WebViewModal: FC<ModalsScreenProps<"webview-modal-screen">> = ({ navigation, route }) => {
  const uri = route.params.uri;
  const onGoBack = route.params?.onGoBack ?? noop;
  const onLoad = route.params?.onLoad ?? noop;
  const header = route.params?.header ?? "";

  const handleGoBack = useCallback(() => {
    onGoBack();
    navigation.goBack();
  }, [navigation, onGoBack]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={handleGoBack} />,
      headerTitle: () => <Text preset="headerTitle" text={header} />,
    });
  }, [handleGoBack, header, navigation]);

  return (
    <Screen preset="fixed">
      <WebView source={{ uri }} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24,
  },
});
