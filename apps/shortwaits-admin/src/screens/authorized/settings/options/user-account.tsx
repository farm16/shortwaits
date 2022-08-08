import { useTheme } from "@shortwaits/admin/theme";
import React, { useState } from "react";
import { Divider, List } from "react-native-paper";

export const UserAccountSettings = ({ user }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded((state) => !state);
  const { Colors } = useTheme();

  return (
    <List.Accordion
      title="Account"
      expanded={expanded}
      style={{ backgroundColor: Colors.background }}
      onPress={handlePress}
    >
      <Divider />
      <List.Item
        title="Username"
        description={user.username}
        right={(props) => <List.Icon {...props} icon="account" />}
      />
      <Divider />
      <List.Item
        title="Email"
        description={user.email}
        right={(props) => <List.Icon {...props} icon="email" />}
      />
      {/* <List.Item
        title="Password"
        description={"***"}
        right={props => <List.Icon {...props} icon="folder" />}
      /> */}
    </List.Accordion>
  );
};
