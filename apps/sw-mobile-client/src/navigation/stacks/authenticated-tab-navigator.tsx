import { StackNavigationOptions, createStackNavigator } from "@react-navigation/stack";
import React, { useMemo } from "react";
import { ExploreScreen, HomeScreen, SettingsScreen } from "../../screens";
import { AuthenticatedTabsParamList } from "../navigation-types";

const Tab = createStackNavigator<AuthenticatedTabsParamList>();

export const AuthenticatedTabNavigator = () => {
  const navigatorScreenOptions = useMemo<StackNavigationOptions>(() => {
    return {
      unmountOnBlur: true,
      headerShown: false,
      animationEnabled: false,
    };
  }, []);

  return (
    <Tab.Navigator initialRouteName={"home-screen"} screenOptions={navigatorScreenOptions}>
      <Tab.Screen name={"home-screen"} component={HomeScreen} />
      <Tab.Screen name={"explore-screen"} component={ExploreScreen} />
      <Tab.Screen name={"settings-screen"} component={SettingsScreen} />
    </Tab.Navigator>
  );
};
