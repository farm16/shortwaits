import React from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  AuthorizedScreenHeader,
  Button,
  Screen,
} from "@shortwaits/admin/components";
import { persistor } from "@shortwaits/admin/redux";
import { useTheme } from "@shortwaits/admin/theme";

export const ActivityScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { Colors } = useTheme();
  return (
    <Screen
      preset="fixed"
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      <AuthorizedScreenHeader
        title={"Activity"}
        // iconName2="magnify"
        // iconName1="plus-thick"
      />
    </Screen>
  );
};
