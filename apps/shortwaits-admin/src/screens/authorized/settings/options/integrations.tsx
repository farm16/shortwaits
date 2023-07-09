import { BusinessDtoType } from "@shortwaits/shared-types";
import React, { useState } from "react";
import { Divider, List } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "../../../../theme";

export const IntegrationsSettings = ({
  business,
}: {
  business: BusinessDtoType;
}) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(state => !state);
  const { Colors } = useTheme();

  return (
    <List.Accordion
      title="Video conferences"
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
        title="Zoom"
        right={props => (
          <List.Icon {...props} color={Colors.text} icon="video" />
        )}
      />

      <List.Item
        style={{ backgroundColor: Colors.lightGray }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        title="Google"
        right={props => (
          <List.Icon {...props} color={Colors.text} icon="google" />
        )}
      />
      <List.Item
        style={{ backgroundColor: Colors.lightGray }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        title="Add URL link"
        right={props => (
          <List.Icon {...props} color={Colors.text} icon="link-plus" />
        )}
      />
    </List.Accordion>
  );
};
