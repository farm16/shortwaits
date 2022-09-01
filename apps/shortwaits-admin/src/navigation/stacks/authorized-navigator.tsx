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
} from "../../screens";
import { useTheme } from "../../theme";
import { AUTHORIZED_SCREENS } from "../navigation-constants";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

export const AuthorizedNavigator = () => {
  const { Colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={AUTHORIZED_SCREENS.EVENTS_SCREEN}
      // activeColor={Colors.brandAccent}

      // inactiveColor={Colors.brandAccent2}
      // labeled={true}
      // shifting={true}
      // barStyle={{ backgroundColor: Colors.white }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: Colors.white,
          ...Platform.select({
            ios: {
              shadowColor: "#858F96",
              shadowOpacity: 0.25,
              shadowRadius: 5,
              shadowOffset: { height: -2, width: 0 },
              zIndex: 99,
            },
            android: {
              elevation: 3,
            },
          }),
        },
        // tabBarIconStyle: { color: Colors.brandSecondary6 },
        tabBarActiveTintColor: Colors.brandAccent,
        tabBarInactiveTintColor: Colors.brandAccent2,
      }}
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
        name={AUTHORIZED_SCREENS.CLIENTS_SCREEN}
        component={ClientsScreen}
        options={{
          tabBarLabel: "Clients",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "account-group" : "account-group-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_SCREENS.MY_BUSINESS_SCREEN}
        component={MyBusinessScreen}
        options={{
          tabBarLabel: "My Business",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "store" : "store-outline"}
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
