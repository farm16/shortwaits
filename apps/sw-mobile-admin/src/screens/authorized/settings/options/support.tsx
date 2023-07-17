import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { useTheme } from "../../../../theme";

export const SupportSettings = () => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(state => !state);
  const { Colors } = useTheme();

  return (
    <List.Accordion
      title="Support"
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
        title="Email"
        description={"support@shortwaits.com"}
        right={props => (
          <List.Icon {...props} icon="email" color={Colors.text} />
        )}
      />

      <List.Item
        style={{ backgroundColor: Colors.lightGray }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        title="Phone"
        description={"123-456-7890"}
        right={props => (
          <List.Icon {...props} icon="phone" color={Colors.text} />
        )}
      />
    </List.Accordion>
  );
};
