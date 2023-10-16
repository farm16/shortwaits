import React, { ReactNode, ReactElement, useCallback, useState } from "react";
import { Platform, StyleSheet, View, Image } from "react-native";
import { Screen, ScrollView, Space, Text } from "../..";
import { ScreenProps } from "../../common/screen/screen.props";
import { useTheme } from "../../../theme";
import { Banner } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spinner from "react-native-spinkit";

type FormContainerProps = {
  children: ReactNode;
  footer?: ReactElement;
  withStatusBanner?: boolean;
  status?: "success" | "error";
  retry?: () => void;
  isLoading?: boolean;
  successMessage?: string;
  errorMessage?: string;
} & ScreenProps;

export const FormContainer = (props: FormContainerProps) => {
  const {
    children,
    footer,
    retry,
    status,
    isLoading,
    withStatusBanner = true,
    preset = "scroll",
    errorMessage = "Something went wrong. Please try again later.",
    successMessage = "Success!",
    ...rest
  } = props;
  const [isStatusBannerVisible, setIsStatusBannerVisible] = useState(true);
  const clonedFooter = footer ? React.cloneElement(footer) : null;

  const { Colors } = useTheme();
  const backgroundColor = Colors.backgroundOverlay;
  // todo work in progress
  const renderStatusBanner = useCallback(() => {
    const actions = [
      {
        label: "Dismiss",
        textColor: Colors.text,
        onPress: () => {
          setIsStatusBannerVisible(false);
        },
      },
    ];
    if (retry) {
      actions.push({
        label: "Retry",
        textColor: Colors.text,
        onPress: () => {
          retry();
        },
      });
    }
    return (
      <Banner
        visible={isStatusBannerVisible}
        contentStyle={{
          backgroundColor: status === "success" ? Colors.successBackground : Colors.failedBackground,
        }}
        actions={actions}
        icon={({ size }) => (
          <Icon name={status === "success" ? "check-circle-outline" : "alert-circle-outline"} size={size} color={status === "success" ? Colors.success : Colors.failed} />
        )}
      >
        <Text preset={status === "success" ? "success" : "failed"} text={status === "success" ? successMessage : errorMessage} />
      </Banner>
    );
  }, [Colors.failed, Colors.failedBackground, Colors.success, Colors.successBackground, Colors.text, errorMessage, isStatusBannerVisible, retry, status, successMessage]);

  if (isLoading) {
    return (
      <Screen preset="fixed" unsafe {...rest}>
        <Space size="small" />
        <View
          style={[
            styles.fixedView,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Spinner isVisible={true} size={50} type="ThreeBounce" color={Colors.brandSecondary} />
        </View>
        {clonedFooter ? <View style={[styles.footer, { backgroundColor }]}>{clonedFooter}</View> : null}
      </Screen>
    );
  }

  if (preset === "fixed") {
    return (
      <Screen preset="fixed" unsafe {...rest}>
        {/* {withStatusBanner ? renderStatusBanner() : null} */}
        <Space size="small" />
        <View style={styles.fixedView}>{children}</View>
        {clonedFooter ? <View style={[styles.footer, { backgroundColor }]}>{clonedFooter}</View> : null}
      </Screen>
    );
  }

  return (
    <Screen preset="fixed" unsafe {...rest}>
      {/* {withStatusBanner ? renderStatusBanner() : null} */}
      <Space size="small" />
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
      {clonedFooter ? <View style={[styles.footer, { backgroundColor }]}>{clonedFooter}</View> : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  root: {},
  fixedView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 4,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        paddingBottom: 24,
        borderTopWidth: 1,
        borderTopColor: "rgba(0, 0, 0, 0.1)",
      },
    }),
  },
});
