import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  SettingsScreen,
  EventsScreen,
  ServicesScreen,
  ActivityScreen,
  StaffScreen,
} from "../../screens";
import { useTheme } from "../../theme";
import { AUTHORIZED_SCREENS } from "../navigation-constants";

const Tab = createMaterialBottomTabNavigator();

export const AuthorizedNavigator = () => {
  const { Colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={AUTHORIZED_SCREENS.EVENTS_SCREEN}
      activeColor={Colors.brandAccent}
      inactiveColor={Colors.brandAccent2}
      labeled={true}
      shifting={true}
      barStyle={{ backgroundColor: Colors.white }}
    >
      <Tab.Screen
        name={AUTHORIZED_SCREENS.EVENTS_SCREEN}
        component={EventsScreen}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar-clock" : "calendar-clock-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_SCREENS.STAFF_SCREEN}
        component={StaffScreen}
        options={{
          tabBarLabel: "Staff",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "clipboard-account" : "clipboard-account-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_SCREENS.SERVICES_SCREEN}
        component={ServicesScreen}
        options={{
          tabBarLabel: "Services",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "briefcase-variant" : "briefcase-variant-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_SCREENS.ACTIVITY_SCREEN}
        component={ActivityScreen}
        options={{
          tabBarLabel: "Activity",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "chart-timeline-variant-shimmer"
                  : "chart-timeline-variant"
              }
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_SCREENS.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-cog" : "account-cog-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
// const exitRoutes = ['welcome'];
//  const canExit = (routeName: string) => exitRoutes.includes(routeName);