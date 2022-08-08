import { useTheme } from "@shortwaits/admin/theme";
import React, { useState } from "react";
import { Divider, List } from "react-native-paper";

export const ContactsSettings = ({ business }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded((state) => !state);
  const { Colors } = useTheme();

  return (
    <List.Accordion
      title="Contacts"
      style={{ backgroundColor: Colors.background }}
      expanded={expanded}
      onPress={handlePress}
    >
      <Divider />
      <List.Item
        title="Upload Contacts"
        right={(props) => <List.Icon {...props} icon="cloud-upload-outline" />}
      />
      <Divider />
      <List.Item
        title="Sync Contacts"
        right={(props) => <List.Icon {...props} icon="book-sync" />}
      />
    </List.Accordion>
  );
};
