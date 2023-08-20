import React, { FC, useCallback, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { ActivityIndicator, Divider, List } from "react-native-paper";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

import { Button, Screen, Space, Switch } from "../../../components";
import { useTheme } from "../../../theme";
import { useUser, useBusiness, useSignOut } from "../../../store";
import { ManageAdminUsers } from "./options/user-account";
import { ShortwaitsCustomerSupport } from "./options/support";
import { useGetBusinessQuery, useLocalSignOutMutation, useUpdateBusinessMutation } from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";
import { noop } from "lodash";

export const SettingsScreen: FC<AuthorizedScreenProps<"settings-screen">> = ({ navigation }) => {
  const { Colors } = useTheme();
  const dispatch = useDispatch();
  const user = useUser();
  const currentBusiness = useBusiness();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // console.log("currentBusiness", JSON.stringify(currentBusiness, null, 2));

  const [updateBusiness, state] = useUpdateBusinessMutation();

  const [expanded, setExpanded] = React.useState(true);
  const [signOut] = useLocalSignOutMutation();
  const handlePress = () => setExpanded(!expanded);
  const handleSignOut = useCallback(async () => {
    await signOut(undefined);
  }, [signOut]);

  const itemStyle = {
    borderColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  };

  // if (isError) return null;

  // if (state.isLoading) return <ActivityIndicator />;

  return (
    <Screen preset="scroll" backgroundColor="backgroundOverlay" unsafeBottom>
      <List.Section
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: Colors.gray,
        }}
      >
        <List.Item
          title={`Business Plan ${currentBusiness?.accountType === "free" ? "(Basic)" : ""}`}
          style={itemStyle}
          // style={{ backgroundColor: Colors.lightGray }}
          titleStyle={{ color: Colors.text }}
          descriptionStyle={{ color: Colors.orange5, fontWeight: "700", textTransform: "uppercase" }}
          description={`${
            currentBusiness?.accountType === "free" ? "Upgrade to Premium !!!" : currentBusiness?.accountType
          }`}
          right={props => <List.Icon {...props} color={Colors.text} icon="chevron-right" />}
          onPress={() => navigation.navigate("authorized-stack", { screen: "plans-screen" })}
        />
        <List.Item
          titleStyle={{ color: Colors.text }}
          style={itemStyle}
          descriptionStyle={{ color: Colors.subText }}
          title="Web booking"
          description="Enable customers to book online"
          right={() => (
            <Switch
              disabled
              isLoading={state.isLoading}
              value={currentBusiness?.isWebBookingEnabled ?? false}
              onChange={() => {
                const isWebBookingEnabled = !(currentBusiness?.isWebBookingEnabled ?? false);
                console.log("isWebBookingEnabled", isWebBookingEnabled);
                updateBusiness({
                  ...currentBusiness,
                  isWebBookingEnabled,
                });
              }}
            />
          )}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{ color: Colors.text }}
          title="App notifications"
          description="Allow app notifications"
          style={itemStyle}
          right={() => (
            <Switch
              isLoading={state.isLoading}
              value={currentBusiness?.isAppNotificationEnabled ?? false}
              onChange={() => {
                const isAppNotificationEnabled = !(currentBusiness?.isAppNotificationEnabled ?? false);
                console.log("isAppNotificationEnabled", isAppNotificationEnabled);
                updateBusiness({
                  ...currentBusiness,
                  isAppNotificationEnabled,
                });
              }}
            />
          )}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{ color: Colors.text }}
          title="SMS notifications"
          description="Receive updates via SMS"
          style={itemStyle}
          right={() => (
            <Switch
              isLoading={state.isLoading}
              value={currentBusiness?.isSmsNotificationEnabled ?? false}
              onChange={() => {
                const isSmsNotificationEnabled = !(currentBusiness?.isSmsNotificationEnabled ?? false);
                console.log("isSmsNotificationEnabled", isSmsNotificationEnabled);
                updateBusiness({
                  ...currentBusiness,
                  isSmsNotificationEnabled,
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
          title="Video conference"
          description="Allow video conference link in booking"
          right={() => (
            <Switch
              isLoading={state.isLoading}
              value={currentBusiness?.isVideoConferenceEnabled ?? false}
              onChange={() => {
                const isVideoConferenceEnabled = !(currentBusiness?.isVideoConferenceEnabled ?? false);
                console.log("isVideoConferenceEnabled", isVideoConferenceEnabled);
                updateBusiness({
                  ...currentBusiness,
                  isVideoConferenceEnabled,
                });
              }}
            />
          )}
        />
        <ManageAdminUsers user={user} />

        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title="Rate us"
          description="Rate us on the app store"
          left={props => (
            <List.Icon
              {...props}
              style={{
                marginRight: 0,
                paddingRight: 0,
              }}
              color={Colors.red4}
              icon="heart"
            />
          )}
          right={props => <List.Icon {...props} color={Colors.text} icon="chevron-right" />}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          title="Currency"
          disabled
          style={{ backgroundColor: Colors.lightGray }}
          titleStyle={{ color: Colors.text }}
          descriptionStyle={{ color: Colors.subText }}
          description={"USD - United States Dollar"}
          right={props => <List.Icon {...props} color={Colors.gray} icon="chevron-right" />}
        />

        <ShortwaitsCustomerSupport />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title="Disable Store"
          description="Disable your store temporarily"
          right={() => (
            <Switch
              isLoading={state.isLoading}
              value={currentBusiness?.isDisabled ?? false}
              onChange={() => {
                const isDisabled = !(currentBusiness?.isDisabled ?? false);
                console.log("isDisabled", isDisabled);
                updateBusiness({
                  ...currentBusiness,
                  isDisabled,
                });
              }}
            />
          )}
        />
        <Space direction="horizontal" />
        <Button
          style={styles.signOutButton}
          textStyle={styles.signOutButtonText}
          text="Sign Out"
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
