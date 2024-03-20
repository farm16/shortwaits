import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { BusinessDetailsScreen, EventDetailsScreen, UserProfileScreen } from "../../screens";
import { AUTHORIZED_STACK_SCREENS } from "../navigation-constants";
import { AuthorizedStackParamList } from "../navigation-types";

const Stack = createStackNavigator<AuthorizedStackParamList>();
const { EVENT_DETAILS_SCREEN, USER_PROFILE_SCREEN, BUSINESS_DETAILS_SCREEN } = AUTHORIZED_STACK_SCREENS;

export const AuthorizedStackNavigator = () => {
  const { Colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name={EVENT_DETAILS_SCREEN} component={EventDetailsScreen} />
      <Stack.Screen name={BUSINESS_DETAILS_SCREEN} component={BusinessDetailsScreen} />
      <Stack.Screen name={USER_PROFILE_SCREEN} component={UserProfileScreen} />
    </Stack.Navigator>
  );
};
