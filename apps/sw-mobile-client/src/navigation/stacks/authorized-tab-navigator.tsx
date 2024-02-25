import { StackNavigationOptions, createStackNavigator } from "@react-navigation/stack";
import React, { useMemo } from "react";
import { ExploreScreen, HomeScreen, SettingsScreen } from "../../screens";
import { AUTHORIZED_TAB_SCREENS } from "../navigation-constants";
import { AuthorizedTabsParamList } from "../navigation-types";

const Tab = createStackNavigator<AuthorizedTabsParamList>();

export const AuthorizedTabNavigator = () => {
  const navigatorScreenOptions = useMemo<StackNavigationOptions>(() => {
    return {
      unmountOnBlur: true,
      headerShown: false,
      animationEnabled: false,
    };
  }, []);

  return (
    <Tab.Navigator initialRouteName={AUTHORIZED_TAB_SCREENS.HOME_SCREEN} screenOptions={navigatorScreenOptions}>
      <Tab.Screen name={AUTHORIZED_TAB_SCREENS.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={AUTHORIZED_TAB_SCREENS.EXPLORE_SCREEN} component={ExploreScreen} />
      <Tab.Screen name={AUTHORIZED_TAB_SCREENS.SETTINGS_SCREEN} component={SettingsScreen} />
    </Tab.Navigator>
  );
};
