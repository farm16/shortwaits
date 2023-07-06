import React from "react";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  SettingsScreen,
  EventsScreen,
  MyBusinessScreen,
  ActivityScreen,
  ClientsScreen,
  EventScreen,
} from "../../screens";
import { useTheme } from "../../theme";
import { AUTHORIZED_STACK_SCREENS } from "../navigation-constants";
import { Platform } from "react-native";
import { useMobileAdmin } from "../../redux";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthorizedStackParamList } from "../navigation-types";

const Stack = createStackNavigator<AuthorizedStackParamList>();

export const AuthorizedStackNavigator = () => {
  const { Colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.backgroundOverlay,
        },
      }}
    >
      <Stack.Screen
        name={AUTHORIZED_STACK_SCREENS.EVENT_SCREEN}
        component={EventScreen}
      />
    </Stack.Navigator>
  );
};
