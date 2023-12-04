import React, { FC, useCallback, useLayoutEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl"; // Import FormattedMessage and useIntl
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Button, Container, Screen, Space, Switch, Text } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useGetStaffQuery, useLocalSignOutMutation, useUpdateBusinessMutation } from "../../../services";
import { useBusiness } from "../../../store";
import { useTheme } from "../../../theme";
import { AppInfoSettings } from "./options/app-info";
import { AppLanguage } from "./options/select-language";
import { ShortwaitsCustomerSupport } from "./options/support";
import { ManageAdminUsers } from "./options/user-account";

export const SettingsScreen: FC<AuthorizedScreenProps<"settings-screen">> = ({ navigation }) => {
  const { Colors } = useTheme();
  const currentBusiness = useBusiness();
  const { data: staffQuery, isLoading, isError, isSuccess } = useGetStaffQuery(currentBusiness?._id ?? skipToken);
  const intl = useIntl(); // Initialize the Intl instance
  const [updateBusiness, state] = useUpdateBusinessMutation();
  const [signOut] = useLocalSignOutMutation();
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

  const itemStyle = {
    borderColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  };

  return (
    <Screen preset="scroll" backgroundColor="lightBackground" unsafeBottom unsafe>
      <List.Section>
        <List.Item
          title={<FormattedMessage id="Settings_Screen.business_plan.title" values={{ accountType: currentBusiness?.accountType }} />}
          style={itemStyle}
          titleStyle={{ color: Colors.text }}
          descriptionStyle={{ color: Colors.orange5, fontWeight: "700", textTransform: "uppercase" }}
          description={<FormattedMessage id="Settings_Screen.business_plan.description" values={{ accountType: currentBusiness?.accountType }} />}
          right={props => <List.Icon {...props} color={Colors.brandPrimary} icon="chevron-right" />}
          onPress={() => navigation.navigate("authorized-stack", { screen: "plans-screen" })}
        />
        <List.Item
          titleStyle={{ color: Colors.text }}
          style={itemStyle}
          descriptionStyle={{ color: Colors.subText }}
          title={<FormattedMessage id="Settings_Screen.web_booking_title" />}
          description={<FormattedMessage id="Settings_Screen.web_booking_description" />}
          right={props => (
            <Switch
              isLoading={state.isLoading}
              value={currentBusiness?.isWebBookingEnabled ?? false}
              onChange={() => {
                const isWebBookingEnabled = !(currentBusiness?.isWebBookingEnabled ?? false);
                console.log("isWebBookingEnabled", isWebBookingEnabled);
                updateBusiness({
                  businessId: currentBusiness._id,
                  body: {
                    ...currentBusiness,
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
              isLoading={state.isLoading}
              value={currentBusiness?.isAppNotificationEnabled ?? false}
              onChange={() => {
                const isAppNotificationEnabled = !(currentBusiness?.isAppNotificationEnabled ?? false);
                updateBusiness({
                  businessId: currentBusiness._id,
                  body: {
                    ...currentBusiness,
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
              isLoading={state.isLoading}
              value={currentBusiness?.isSmsNotificationEnabled ?? false}
              onChange={() => {
                const isSmsNotificationEnabled = !(currentBusiness?.isSmsNotificationEnabled ?? false);
                console.log("isSmsNotificationEnabled", isSmsNotificationEnabled);
                updateBusiness({
                  businessId: currentBusiness._id,
                  body: {
                    ...currentBusiness,
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
              isLoading={state.isLoading}
              value={currentBusiness?.isVideoConferenceEnabled ?? false}
              onChange={() => {
                const isVideoConferenceEnabled = !(currentBusiness?.isVideoConferenceEnabled ?? false);
                console.log("isVideoConferenceEnabled", isVideoConferenceEnabled);
                updateBusiness({
                  businessId: currentBusiness._id,
                  body: {
                    ...currentBusiness,
                    isVideoConferenceEnabled,
                  },
                });
              }}
            />
          )}
        />
        <ManageAdminUsers admins={staffQuery?.data} />
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
        />
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
          title={<FormattedMessage id="Settings_Screen.disable_store_title" />}
          description={<FormattedMessage id="Settings_Screen.disable_store_description" />}
          right={() => (
            <Switch
              isLoading={state.isLoading}
              value={currentBusiness?.isDisabled ?? false}
              onChange={() => {
                const isDisabled = !(currentBusiness?.isDisabled ?? false);
                updateBusiness({
                  businessId: currentBusiness._id,
                  body: {
                    ...currentBusiness,
                    isDisabled,
                  },
                });
              }}
            />
          )}
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
