import { BusinessUserDtoType } from "@shortwaits/shared-lib";
import React, { useState } from "react";
import { Divider, List } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "../../../../theme";

export const UserAccountSettings = ({ user }: { user: BusinessUserDtoType }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(state => !state);
  const { Colors } = useTheme();

  if (!user) return null;

  return (
    <List.Accordion
      title="Account"
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
        <List.Icon {...props} color={Colors.text} icon={props.isExpanded ? "chevron-up" : "chevron-down"} />
      )}
    >
      <List.Item
        style={{ backgroundColor: Colors.lightGray }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        title="Username"
        description={user.displayName}
        right={props => <List.Icon {...props} color={Colors.text} icon="account" />}
      />

      <List.Item
        style={{ backgroundColor: Colors.lightGray }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
        title="Email"
        description={user.email}
        right={props => <List.Icon {...props} color={Colors.text} icon="email" />}
      />
      {/* <List.Item
            style={{ backgroundColor: Colors.lightGray }}
        titleStyle={{ color: Colors.text }}
        descriptionStyle={{ color: Colors.subText }}
            titleStyle={{ color: Colors.text }}
        title="Password"
        description={"***"}
        right={props => <List.Icon {...props} icon="folder" />}
      /> */}
    </List.Accordion>
  );
};
