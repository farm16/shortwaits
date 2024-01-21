import { useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { useAuthorizedScreensNavigation } from "../../../../navigation";

export const AppInfoSettings = () => {
  const { Colors } = useTheme();
  const navigation = useAuthorizedScreensNavigation<"settings-screen">();
  const itemStyle = {
    borderColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  };

  return (
    <List.Item
      descriptionStyle={{ color: Colors.subText }}
      titleStyle={{
        color: Colors.text,
      }}
      style={itemStyle}
      title={"App Information"}
      onPress={() => {
        navigation.navigate("authorized-stack", {
          screen: "app-info-screen",
        });
      }}
      right={props => <List.Icon {...props} color={Colors.brandPrimary} icon="chevron-right" />}
    />
  );
};
