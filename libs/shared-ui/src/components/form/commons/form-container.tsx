import React, { ReactElement, ReactNode, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Banner } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Spinner from "react-native-spinkit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Screen, Space, Text } from "../..";
import { useTheme } from "../../../theme";
import { getResponsiveHeight } from "../../../utils";
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
  const backgroundColor = "lightBackground";
  const statusBarBackgroundColor = "white";

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
      <View style={[styles.loadingView]}>
        <Spinner isVisible={true} size={50} type="ThreeBounce" color={Colors.brandSecondary} />
      </View>
    );
  }

  if (preset === "fixed") {
    return (
      <Screen unsafe preset="fixed" {...rest} withHorizontalPadding={withHorizontalPadding} backgroundColor={backgroundColor} statusBarBackgroundColor={statusBarBackgroundColor}>
        <Space size="large" />
        {children}
        {clonedFooter ? (
          <View
            style={[
              styles.footer,
              {
                paddingBottom: insets.bottom + getResponsiveHeight(16),
                paddingTop: getResponsiveHeight(16),
              },
            ]}
          >
            {clonedFooter}
          </View>
        ) : null}
      </Screen>
    );
  }

  return (
    <Screen unsafe preset="scroll" {...rest} withHorizontalPadding={withHorizontalPadding} backgroundColor={backgroundColor} statusBarBackgroundColor={statusBarBackgroundColor}>
      <Space size="large" />
      {children}
      {clonedFooter ? (
        <View
          style={[
            styles.footer,
            {
              paddingBottom: getResponsiveHeight(16),
              paddingTop: getResponsiveHeight(16),
            },
          ]}
        >
          {clonedFooter}
        </View>
      ) : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
