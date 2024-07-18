import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  AppInfoScreen,
  BusinessClientProfileScreen,
  BusinessLocalClientProfileScreen,
  BusinessProfileScreen,
  BusinessUserProfileScreen,
  EventScreen,
  PlansScreen,
} from "../../screens";
import { AUTHORIZED_STACK_SCREENS } from "../navigation-constants";
import { AuthorizedStackParamList } from "../navigation-types";

const Stack = createStackNavigator<AuthorizedStackParamList>();

export const AuthorizedStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.EVENT_SCREEN} component={EventScreen} />
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.BUSINESS_CLIENT_SCREEN} component={BusinessClientProfileScreen} />
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.BUSINESS_LOCAL_CLIENT_SCREEN} component={BusinessLocalClientProfileScreen} />
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.BUSINESS_STAFF_SCREEN} component={BusinessUserProfileScreen} />
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.BUSINESS_PROFILE_SCREEN} component={BusinessProfileScreen} />
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.PLANS_SCREEN} component={PlansScreen} />
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.APP_INFO_SCREEN} component={AppInfoScreen} />
    </Stack.Navigator>
  );
};
