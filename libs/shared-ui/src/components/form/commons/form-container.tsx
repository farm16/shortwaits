import React, { ReactElement, ReactNode, useCallback, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Banner } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Spinner from "react-native-spinkit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Screen, Text } from "../..";
import { useTheme } from "../../../theme";
import { ScreenProps } from "../../common/screen/screen.props";

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
    withHorizontalPadding = true,
    withStatusBanner = true,
    preset = "scroll",
    errorMessage = "Something went wrong. Please try again later.",
    successMessage = "Success!",
    ...rest
  } = props;
  const [isStatusBannerVisible, setIsStatusBannerVisible] = useState(true);
  const clonedFooter = footer ? React.cloneElement(footer) : null;

  const { Colors } = useTheme();
  const backgroundColor = Colors.lightBackground;
  // todo: work in progress
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
  const insets = useSafeAreaInsets();
  if (isLoading) {
    return (
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
    );
  }

  if (preset === "fixed") {
    return (
      <>
        <Screen preset="fixed" unsafe {...rest} withHorizontalPadding={withHorizontalPadding}>
          {children}
        </Screen>
        {clonedFooter ? <View style={[styles.footer, { backgroundColor, paddingBottom: insets.bottom + 16 }]}>{clonedFooter}</View> : null}
      </>
    );
  }

  return (
    <>
      <Screen preset="scroll" unsafe {...rest} withHorizontalPadding={withHorizontalPadding}>
        {children}
      </Screen>
      {clonedFooter ? <View style={[styles.footer, { backgroundColor, paddingBottom: insets.bottom + 16 }]}>{clonedFooter}</View> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {},
  fixedView: {
    flex: 1,
  },
  scrollView: {},
  footer: {
    paddingTop: 22,
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
