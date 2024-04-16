import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@shortwaits/shared-ui";
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ClientsScreen, EventsScreen, MyBusinessScreen, SettingsScreen } from "../../screens";
import { AUTHORIZED_TAB_SCREENS } from "../navigation-constants";

const Tab = createBottomTabNavigator();

export const AuthorizedTabNavigator = () => {
  const { Colors } = useTheme();
  const intl = useIntl();
  const screenOptions = useMemo(
    () =>
      ({
        unmountOnBlur: true,
        tabBarHideOnKeyboard: true,
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          borderTopWidth: 0,
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
        tabBarActiveTintColor: Colors.brandSecondary,
        tabBarInactiveTintColor: Colors.disabledText,
        tabBarAllowFontScaling: true,
        tabBarLabelStyle: {
          paddingBottom: Platform.OS === "android" ? 4 : 0,
        },
        tabBarStyle: {
          backgroundColor: Colors.white,
        },
      } as BottomTabNavigationOptions),
    [Colors]
  );

  return (
    <Tab.Navigator initialRouteName={AUTHORIZED_TAB_SCREENS.EVENTS_SCREEN} screenOptions={screenOptions}>
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.EVENTS_SCREEN}
        component={EventsScreen}
        options={{
          tabBarLabel: intl.formatMessage({ id: "Navigation.tab.label.events" }),
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? "calendar-clock" : "calendar-clock-outline"} color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.CLIENTS_SCREEN}
        component={ClientsScreen}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: intl.formatMessage({ id: "Navigation.tab.label.clients" }),
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? "account-group" : "account-group-outline"} color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.MY_BUSINESS_SCREEN}
        component={MyBusinessScreen}
        options={{
          tabBarLabel: intl.formatMessage({ id: "Navigation.tab.label.myBusiness" }),
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name={focused ? "store" : "store-outline"} color={color} size={25} />,
        }}
      />
      {/* 
      // todo: uncomment when activity screen is ready
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.ACTIVITY_SCREEN}
        component={ActivityScreen}
        options={{
          tabBarLabel: intl.formatMessage({ id: "Navigation.tab.label.activities" }),
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name={focused ? "timeline-text" : "timeline-text-outline"} color={color} size={25} />,
        }}
      /> */}
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          tabBarLabel: intl.formatMessage({ id: "Navigation.tab.label.settings" }),
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name={focused ? "account-cog" : "account-cog-outline"} color={color} size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};
// const exitRoutes = ['welcome'];
//  const canExit = (routeName: string) => exitRoutes.includes(routeName);
