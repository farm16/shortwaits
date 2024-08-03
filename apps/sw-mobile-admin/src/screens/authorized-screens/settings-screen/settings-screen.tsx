import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Button, Container, Screen, Space, Switch, Text, updateAllBusinessDays, useTheme } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl"; // Import FormattedMessage and useIntl
import { Alert, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import Rate, { AndroidMarket } from "react-native-rate";
import { AuthorizedScreenProps } from "../../../navigation";
import { useGetBusinessUsersQuery, useLocalSignOutMutation, useUpdateBusinessMutation } from "../../../services";
import { useBusiness } from "../../../store";
import { AppInfoSettings } from "./options/app-info";
import { BusinessUsersTile } from "./options/business-users-tile";
import { AppLanguage } from "./options/select-language";
import { ShortwaitsCustomerSupport } from "./options/support";

export const SettingsScreen: FC<AuthorizedScreenProps<"settings-screen">> = ({ navigation }) => {
  const { Colors } = useTheme();
  const business = useBusiness();
  const intl = useIntl(); // Initialize the Intl instance
  const [updateBusiness, updateBusinessState] = useUpdateBusinessMutation();
  const [signOut] = useLocalSignOutMutation();
  const { isLoading, isError } = useGetBusinessUsersQuery(business?._id ?? skipToken);

  const handleSignOut = useCallback(async () => {
    await signOut(undefined);
  }, [signOut]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center">
            <Text
              preset="headerTitle"
              style={{
                fontWeight: "700",
                paddingLeft: 16,
              }}
              text={"Settings"}
            />
          </Container>
        );
      },
    });
  }, [navigation]);

  const handleBusinessDisable = useCallback(() => {
    const isAllDaysClosed = business?.isDisabled;
    const newHours = updateAllBusinessDays(business?.hours, isAllDaysClosed);
    const disabledTitle = intl.formatMessage({ id: "Settings_Screen.disable_store_alert_title" });
    const enabledTitle = intl.formatMessage({ id: "Settings_Screen.enable_store_alert_title" });
    const disabledMessage = intl.formatMessage({ id: "Settings_Screen.disable_store_alert_description" });
    const enabledMessage = intl.formatMessage({ id: "Settings_Screen.enable_store_alert_description" });

    Alert.alert(business?.isDisabled ? enabledTitle : disabledTitle, business?.isDisabled ? enabledMessage : disabledMessage, [
      {
        text: intl.formatMessage({ id: "Common.cancel" }),
        style: "cancel",
      },
      {
        text: business?.isDisabled ? intl.formatMessage({ id: "Common.ok" }) : intl.formatMessage({ id: "Common.disable" }),
        onPress: () => {
          updateBusiness({
            businessId: business._id,
            body: {
              ...business,
              isDisabled: !business?.isDisabled,
              hours: newHours,
            },
          });
        },
      },
    ]);
  }, [business, intl, updateBusiness]);

  const itemStyle = {
    borderColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  };

  const options = {
    AppleAppID: "2193813192",
    GooglePackageName: "com.mywebsite.myapp",
    AmazonPackageName: "com.mywebsite.myapp",
    OtherAndroidURL: "http://www.randomappstore.com/app/47172391",
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: false,
    openAppStoreIfInAppFails: true,
    fallbackPlatformURL: "http://www.mywebsite.com/myapp.html",
  };

  return (
    <Screen preset="scroll" unsafeBottom unsafe>
      <List.Section>
        {/*
        // will uncomment this when the business plan feature is ready and allowed to be displayed
        { <List.Item
          title={<FormattedMessage id="Settings_Screen.business_plan.title" values={{ accountType: business?.accountType }} />}
          style={itemStyle}
          titleStyle={{ color: Colors.text }}
          descriptionStyle={{ color: Colors.orange5, fontWeight: "700", textTransform: "uppercase" }}
          description={<FormattedMessage id="Settings_Screen.business_plan.description" values={{ accountType: business?.accountType }} />}
          right={props => <List.Icon {...props} color={Colors.brandPrimary} icon="chevron-right" />}
          onPress={() => navigation.navigate("authorized-stack", { screen: "plans-screen" })}
        />} */}
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={<FormattedMessage id="Settings_Screen.rate_us_title" />}
          description={<FormattedMessage id="Settings_Screen.rate_us_description" />}
          left={props => <List.Icon {...props} color={Colors.red4} icon="heart" />}
          right={props => <List.Icon {...props} color={Colors.brandPrimary} icon="chevron-right" />}
          onPress={() => {
            Rate.rate(options, (success, errorMessage) => {
              if (success) {
                // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                console.log("Example page Rate.rate() success");
              }
              if (errorMessage) {
                // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
                console.error(`Example page Rate.rate() error: ${errorMessage}`);
              }
            });
          }}
        />
        <List.Item
          titleStyle={{ color: Colors.text }}
          style={itemStyle}
          descriptionStyle={{ color: Colors.subText }}
          title={<FormattedMessage id="Settings_Screen.web_booking_title" />}
          description={<FormattedMessage id="Settings_Screen.web_booking_description" />}
          right={_props => (
            <Switch
              isLoading={updateBusinessState.isLoading}
              value={business?.isWebBookingEnabled ?? false}
              onChange={() => {
                const isWebBookingEnabled = !(business?.isWebBookingEnabled ?? false);
                console.log("isWebBookingEnabled", isWebBookingEnabled);
                updateBusiness({
                  businessId: business._id,
                  body: {
                    ...business,
                    isWebBookingEnabled,
                  },
                });
              }}
            />
          )}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{ color: Colors.text }}
          title={<FormattedMessage id="Settings_Screen.app_notifications_title" />}
          description={<FormattedMessage id="Settings_Screen.app_notifications_description" />}
          style={itemStyle}
          right={() => (
            <Switch
              isLoading={updateBusinessState.isLoading}
              value={business?.isAppNotificationEnabled ?? false}
              onChange={() => {
                const isAppNotificationEnabled = !(business?.isAppNotificationEnabled ?? false);
                updateBusiness({
                  businessId: business._id,
                  body: {
                    ...business,
                    isAppNotificationEnabled,
                  },
                });
              }}
            />
          )}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{ color: Colors.text }}
          title={<FormattedMessage id="Settings_Screen.sms_notifications_title" />}
          description={<FormattedMessage id="Settings_Screen.sms_notifications_description" />}
          style={itemStyle}
          right={() => (
            <Switch
              isLoading={updateBusinessState.isLoading}
              value={business?.isSmsNotificationEnabled ?? false}
              onChange={() => {
                const isSmsNotificationEnabled = !(business?.isSmsNotificationEnabled ?? false);
                console.log("isSmsNotificationEnabled", isSmsNotificationEnabled);
                updateBusiness({
                  businessId: business._id,
                  body: {
                    ...business,
                    isSmsNotificationEnabled,
                  },
                });
              }}
            />
          )}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={<FormattedMessage id="Settings_Screen.video_conference_title" />}
          description={<FormattedMessage id="Settings_Screen.video_conference_description" />}
          right={() => (
            <Switch
              isLoading={updateBusinessState.isLoading}
              value={business?.isVideoConferenceEnabled ?? false}
              onChange={() => {
                const isVideoConferenceEnabled = !(business?.isVideoConferenceEnabled ?? false);
                console.log("isVideoConferenceEnabled", isVideoConferenceEnabled);
                updateBusiness({
                  businessId: business._id,
                  body: {
                    ...business,
                    isVideoConferenceEnabled,
                  },
                });
              }}
            />
          )}
        />
        <BusinessUsersTile />
        <AppLanguage />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          title={<FormattedMessage id="Settings_Screen.currency_title" />}
          disabled
          style={{ backgroundColor: Colors.disabledBackground }}
          titleStyle={{ color: Colors.text }}
          description={<FormattedMessage id="Settings_Screen.currency_description" />}
          right={props => <List.Icon {...props} color={Colors.gray} icon="chevron-right" />}
        />
        <ShortwaitsCustomerSupport />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={business?.isDisabled ? intl.formatMessage({ id: "Settings_Screen.enable_store_title" }) : intl.formatMessage({ id: "Settings_Screen.disable_store_title" })}
          description={
            business?.isDisabled ? intl.formatMessage({ id: "Settings_Screen.enable_store_description" }) : intl.formatMessage({ id: "Settings_Screen.enable_store_description" })
          }
          right={() => <Switch isLoading={updateBusinessState.isLoading} value={business?.isDisabled ?? false} onChange={handleBusinessDisable} />}
        />
        <AppInfoSettings />
        <Space direction="horizontal" />
        <Button
          style={styles.signOutButton}
          textStyle={styles.signOutButtonText}
          text={intl.formatMessage({ id: "Settings_Screen.sign_out_button_text" })}
          onPress={() => {
            handleSignOut();
          }}
        />
      </List.Section>
    </Screen>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    flex: undefined,
    width: "50%",
    height: 45,
    backgroundColor: "white",
    borderColor: "red",
    borderBottomColor: "red",
    borderLeftColor: "red",
    borderRightColor: "red",
    borderWidth: 2,
    alignSelf: "center",
    marginVertical: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  signOutButtonText: {
    color: "red",
    padding: 0,
    margin: 0,
  },
  container: {},
});
