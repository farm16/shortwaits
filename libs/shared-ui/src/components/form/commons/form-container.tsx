import { ReactElement, ReactNode, cloneElement, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Banner } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ActivityIndicator, Screen, Space, Text } from "../..";
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
    unsafeBottom = true,
    ...rest
  } = props;
  const [isStatusBannerVisible, setIsStatusBannerVisible] = useState(true);
  const clonedFooter = footer ? cloneElement(footer) : null;
  const { bottom } = useSafeAreaInsets();
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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const bottomPadding = bottom + 16;

  if (preset === "fixed") {
    return (
      <Screen
        unsafe
        preset="fixed"
        {...rest}
        unsafeBottom={unsafeBottom}
        withHorizontalPadding={false}
        backgroundColor={backgroundColor}
        statusBarBackgroundColor={statusBarBackgroundColor}
      >
        <View style={{ flex: 1, paddingHorizontal: withHorizontalPadding ? 16 : 0 }}>
          <Space size="large" />
          {children}
        </View>
        {clonedFooter ? (
          <View
            style={[
              styles.footer,
              {
                paddingBottom: bottomPadding,
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
    <Screen
      unsafe
      preset="scroll"
      {...rest}
      unsafeBottom={unsafeBottom}
      withHorizontalPadding={false}
      backgroundColor={backgroundColor}
      statusBarBackgroundColor={statusBarBackgroundColor}
      bounces={false}
    >
      <View style={{ paddingHorizontal: withHorizontalPadding ? 16 : 0 }}>
        <Space size="large" />
        {children}
      </View>
      {clonedFooter ? (
        <View
          style={[
            styles.footer,
            {
              paddingBottom: bottomPadding,
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
  footer: {
    paddingTop: getResponsiveHeight(16),
    paddingBottom: getResponsiveHeight(16),
    borderTopColor: "#E5E5E5",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: getResponsiveHeight(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    marginTop: "auto",
  },
});
