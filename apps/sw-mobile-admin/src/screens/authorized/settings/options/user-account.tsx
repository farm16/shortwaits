import { BusinessUserDtoType } from "@shortwaits/shared-lib";
import React, { useState } from "react";
import { Divider, List } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "../../../../theme";

export const ManageAdminUsers = ({ user }: { user: BusinessUserDtoType }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(state => !state);
  const { Colors } = useTheme();

  if (!user) return null;

  return (
    <List.Item
      titleStyle={{ color: Colors.text }}
      descriptionStyle={{ color: Colors.subText }}
      title="Administrators"
      description="Manage your business administrators"
      style={{ borderBottomColor: Colors.gray, borderBottomWidth: StyleSheet.hairlineWidth }}
      right={props => <List.Icon {...props} color={Colors.text} icon="chevron-right" />}
    />
  );
};
