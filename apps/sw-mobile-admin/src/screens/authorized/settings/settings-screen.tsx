import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { FormattedMessage, useIntl } from "react-intl"; // Import FormattedMessage and useIntl

import { Button, Screen, Space, Switch } from "../../../components";
import { useTheme } from "../../../theme";
import { useBusiness } from "../../../store";
import { useGetBusinessUsersMutation, useLocalSignOutMutation, useUpdateBusinessMutation } from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";
import { ManageAdminUsers } from "./options/user-account";
import { ShortwaitsCustomerSupport } from "./options/support";
import { AppInfoSettings } from "./options/app-info";
import { AppLanguage } from "./options/select-language";

export const SettingsScreen: FC<AuthorizedScreenProps<"settings-screen">> = ({ navigation }) => {
  const { Colors } = useTheme();

  const currentBusiness = useBusiness();
  const [admins, setAdmins] = useState([]);

  const [getAdmins] = useGetBusinessUsersMutation();
  const intl = useIntl(); // Initialize the Intl instance

  useEffect(() => {
    async function getCurrentAdmins() {
      const admins = (await getAdmins({ body: [...currentBusiness.admins, ...currentBusiness.superAdmins] }).unwrap()).data;
      return admins;
    }
    if (currentBusiness) {
      getCurrentAdmins().then(admins => {
        const _admin = admins.map(admin => {
          return {
            ...admin,
            isSuperAdmin: currentBusiness.superAdmins.includes(admin._id),
          };
        });
        setAdmins(_admin);
      });
    }
  }, [currentBusiness, getAdmins]);

  console.log("admins", admins);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [updateBusiness, state] = useUpdateBusinessMutation();

  const [signOut] = useLocalSignOutMutation();
  const handleSignOut = useCallback(async () => {
    await signOut(undefined);
  }, [signOut]);

  const itemStyle = {
    borderColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  };

  return (
    <Screen preset="scroll" backgroundColor="backgroundOverlay" unsafeBottom>
      <List.Section
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: Colors.gray,
        }}
      >
        <List.Item
          title={<FormattedMessage id="Settings_Screen.business_plan.title" values={{ accountType: currentBusiness?.accountType }} />}
          style={itemStyle}
          titleStyle={{ color: Colors.text }}
          descriptionStyle={{ color: Colors.orange5, fontWeight: "700", textTransform: "uppercase" }}
          description={<FormattedMessage id="Settings_Screen.business_plan.description" values={{ accountType: currentBusiness?.accountType }} />}
          right={props => <List.Icon {...props} color={Colors.brandSecondary} icon="chevron-right" />}
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
        <ManageAdminUsers admins={admins} />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={<FormattedMessage id="Settings_Screen.rate_us_title" />}
          description={<FormattedMessage id="Settings_Screen.rate_us_description" />}
          left={props => <List.Icon {...props} color={Colors.red4} icon="heart" />}
          right={props => <List.Icon {...props} color={Colors.brandSecondary} icon="chevron-right" />}
        />
        <AppLanguage />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          title={<FormattedMessage id="Settings_Screen.currency_title" />}
          disabled
          style={{ backgroundColor: Colors.lightGray }}
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
