import React from "react";
import { StyleSheet } from "react-native";

import { AuthorizedScreenHeader, Button, Screen } from "../../../components";
import { useTheme } from "../../../theme";
import { Divider, List, Switch } from "react-native-paper";
import { useUser, useBusiness, persistor } from "../../../redux";
import { UserAccountSettings } from "./options/user-account";
import { SupportSettings } from "./options/support";
import { BusinessInfoSettings } from "./options/business-info";
import { IntegrationsSettings } from "./options/integrations";
import { ContactsSettings } from "./options/contacts";
import { useDispatch } from "react-redux";

export const SettingsScreen = ({ navigation }) => {
  const { Colors } = useTheme();
  const dispatch = useDispatch();
  const user = useUser();
  const business = useBusiness();
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <Screen
      preset="scroll"
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      <AuthorizedScreenHeader title="Settings" />

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
          onPress={async function () {
            await persistor.purge();
            dispatch(reset);
          }}
        />
      </List.Section>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    // alignItems: "stretch"
  },
  bottomSheetHeader: {
    alignItems: "center",
  },
  contentContainer: {},
  listSeparator: {
    borderTopWidth: 1,
    marginVertical: 5,
  },
});
