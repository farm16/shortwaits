import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Divider, List, Switch } from "react-native-paper";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

import { Button, Screen, Text } from "../../../components";
import { useTheme } from "../../../theme";
import { useUser, useBusiness, useSignOut } from "../../../redux";
import { UserAccountSettings } from "./options/user-account";
import { SupportSettings } from "./options/support";
import { BusinessInfoSettings } from "./options/business-info";
import { IntegrationsSettings } from "./options/integrations";
import { ContactsSettings } from "./options/contacts";
import { useGetBusinessQuery } from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";

export const SettingsScreen: FC<AuthorizedScreenProps<"settings-screen">> = ({
  navigation,
}) => {
  const { Colors } = useTheme();
  const dispatch = useDispatch();
  const user = useUser();
  const business = useBusiness();

  const {
    data: currentBusiness,
    isLoading,
    isSuccess,
    isError,
  } = useGetBusinessQuery(business ? business._id : skipToken);

  const signOut = useSignOut();
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  if (isError) return null;
  if (isLoading) return <Text>Loading ...</Text>;
  if (isSuccess) {
    return (
      <Screen preset="scroll" unsafe backgroundColor="backgroundOverlay">
        <List.Section
          style={{
            backgroundColor: Colors.backgroundOverlay,
          }}
        >
          <List.Item
            titleStyle={{ color: Colors.text }}
            title="Activate web booking"
            right={() => <Switch />}
          />
          <List.Item
            titleStyle={{ color: Colors.text }}
            title="App notifications"
            right={() => <Switch />}
          />
          <List.Item
            titleStyle={{ color: Colors.text }}
            title="SMS notifications"
            right={() => <Switch />}
          />
          <ContactsSettings business={business} />
          <IntegrationsSettings business={business} />
          <UserAccountSettings user={user} />
          <BusinessInfoSettings business={business} />
          <SupportSettings />
          <List.Item
            titleStyle={{ color: Colors.text }}
            title="Disable Store"
            right={() => <Switch />}
          />
          <Button
            style={{
              flex: undefined,
              width: "50%",
              height: 45,
              backgroundColor: Colors.white,
              borderColor: Colors.red3,
              borderWidth: 2,
              alignSelf: "center",
              marginVertical: 20,
            }}
            textStyle={{
              // textTransform: "uppercase",
              color: Colors.red5,
            }}
            text="Sign Out"
            onPress={() => {
              signOut();
            }}
          />
        </List.Section>
      </Screen>
    );
  }
};
const styles = StyleSheet.create({
  itemText: {
    color: "red",
  },
  container: {},
});
