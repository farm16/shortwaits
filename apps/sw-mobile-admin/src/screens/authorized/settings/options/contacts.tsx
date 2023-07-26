import { BusinessDtoType } from "@shortwaits/shared-lib";
import React, { useState } from "react";
import { Divider, List } from "react-native-paper";
import { StyleSheet } from "react-native";

import { useTheme } from "../../../../theme";

export const ContactsSettings = ({
  business,
}: {
  business: BusinessDtoType;
}) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(state => !state);
  const { Colors } = useTheme();

  return (
    <List.Accordion
      title="Contacts"
      expanded={expanded}
      onPress={handlePress}
      style={{
        backgroundColor: Colors.backgroundOverlay,
        borderBottomColor: Colors.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
      titleStyle={{ color: Colors.text }}
      descriptionStyle={{ color: Colors.subText }}
      right={props => (
        <List.Icon
          {...props}
          color={Colors.text}
          icon={props.isExpanded ? "chevron-up" : "chevron-down"}
        />
      )}
    >
      <List.Item
        style={{ backgroundColor: Colors.lightGray }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        title="Upload Contacts"
        right={props => (
          <List.Icon
            {...props}
            color={Colors.text}
            icon="cloud-upload-outline"
          />
        )}
      />

      <List.Item
        style={{ backgroundColor: Colors.lightGray }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        title="Sync Contacts"
        right={props => (
          <List.Icon {...props} color={Colors.text} icon="book-sync" />
        )}
      />
    </List.Accordion>
  );
};
