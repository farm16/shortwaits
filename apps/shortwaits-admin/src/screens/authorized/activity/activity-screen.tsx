import React from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { AuthorizedScreenHeader, Button, Screen } from "../../../components";
import { persistor } from "../../../redux";
import { useTheme } from "../../../theme";

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
