import React from "react";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Platform } from "react-native";

import { SettingsScreen, EventsScreen, MyBusinessScreen, ActivityScreen, ClientsScreen } from "../../screens";
import { useTheme } from "../../theme";
import { AUTHORIZED_TAB_SCREENS } from "../navigation-constants";

const Tab = createBottomTabNavigator();

export const AuthorizedTabNavigator = () => {
  const { Colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={AUTHORIZED_TAB_SCREENS.EVENTS_SCREEN}
      screenOptions={{
        unmountOnBlur: true,
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          borderTopWidth: 0,
          backgroundColor: Colors.backgroundOverlay,
          ...Platform.select({
            ios: {
              shadowColor: "#858F96",
              shadowOpacity: 0.25,
              shadowRadius: 5,
              shadowOffset: { height: -2, width: 0 },
            },
            android: {
              elevation: 3,
            },
          }),
        },
        tabBarActiveTintColor: Colors.brandAccent,
        tabBarInactiveTintColor: Colors.brandAccent3,
        tabBarAllowFontScaling: true,
        tabBarLabelStyle: {},
        tabBarStyle: {
          height: Platform.OS === "android" ? 50 : undefined,
          paddingBottom: Platform.OS === "android" ? 4 : undefined,
          backgroundColor: Colors.backgroundOverlay,
        },
      }}
    >
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.EVENTS_SCREEN}
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
        name={AUTHORIZED_TAB_SCREENS.CLIENTS_SCREEN}
        component={ClientsScreen}
        options={{
          headerTitleAlign: "center",
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
        name={AUTHORIZED_TAB_SCREENS.MY_BUSINESS_SCREEN}
        component={MyBusinessScreen}
        options={{
          tabBarLabel: "My Business",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "store" : "store-outline"} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.ACTIVITY_SCREEN}
        component={ActivityScreen}
        options={{
          tabBarLabel: "Activities",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "timeline-text" : "timeline-text-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "account-cog" : "account-cog-outline"} color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
// const exitRoutes = ['welcome'];
//  const canExit = (routeName: string) => exitRoutes.includes(routeName);
