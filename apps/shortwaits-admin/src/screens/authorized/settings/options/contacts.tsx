import { BusinessPayloadType } from "@shortwaits/shared-types";
import React, { useState } from "react";
import { Divider, List } from "react-native-paper";

import { useTheme } from "../../../../theme";

export const ContactsSettings = ({
  business,
}: {
  business: BusinessPayloadType;
}) => {
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
