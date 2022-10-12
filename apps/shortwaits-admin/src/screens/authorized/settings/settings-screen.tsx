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
      <Screen preset="scroll" unsafe>
        <List.Section>
          <List.Item title="Activate web booking" right={() => <Switch />} />
          <Divider />
          <List.Item title="App notifications" right={() => <Switch />} />
          <Divider />
          <List.Item title="SMS notifications" right={() => <Switch />} />
          <Divider />
          <ContactsSettings business={business} />
          <Divider />
          <IntegrationsSettings business={business} />
          <Divider />
          <UserAccountSettings user={user} />
          <Divider />
          <BusinessInfoSettings business={business} />
          <Divider />
          <List.Item title="Disable Store" right={() => <Switch />} />
          <Divider />
          <SupportSettings />
          <Divider />
          <Button
            preset="link"
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
  container: {},
});
