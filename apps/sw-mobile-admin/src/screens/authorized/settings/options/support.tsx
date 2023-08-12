import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { useTheme } from "../../../../theme";

export const ShortwaitsCustomerSupport = () => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(state => !state);
  const { Colors } = useTheme();

  return (
    <List.Accordion
      title="Shortwaits Customer Support"
      expanded={expanded}
      onPress={handlePress}
      style={{
        borderBottomColor: Colors.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: Colors.backgroundOverlay,
      }}
      titleStyle={{ color: Colors.text }}
      right={props => (
        <List.Icon {...props} color={Colors.text} icon={props.isExpanded ? "chevron-up" : "chevron-down"} />
      )}
    >
      <List.Item
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        // style={{ backgroundColor: Colors.staticLightBackground }}
        style={{ borderBottomColor: Colors.gray, borderBottomWidth: StyleSheet.hairlineWidth }}
        title="Email"
        description={"support@shortwaits.com"}
        right={props => <List.Icon {...props} icon="email" color={Colors.text} />}
      />

      <List.Item
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        // style={{ backgroundColor: Colors.staticLightBackground }}
        style={{ borderBottomColor: Colors.gray, borderBottomWidth: StyleSheet.hairlineWidth }}
        title="Phone"
        description={"123-456-7890"}
        right={props => <List.Icon {...props} icon="phone" color={Colors.text} />}
      />
    </List.Accordion>
  );
};
