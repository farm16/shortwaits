import React from "react";
import { EventScreen, PlansScreen } from "../../screens";
import { useTheme } from "../../theme";
import { AUTHORIZED_STACK_SCREENS } from "../navigation-constants";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthorizedStackParamList } from "../navigation-types";
import { BusinessClientScreen } from "../../screens/authorized/users/business-client-screen";
import { BusinessStaffScreen } from "../../screens/authorized/users/business-staff-screen";

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
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.EVENT_SCREEN} component={EventScreen} />
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.PLANS_SCREEN} component={PlansScreen} />
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.BUSINESS_CLIENT_SCREEN} component={BusinessClientScreen} />
      <Stack.Screen name={AUTHORIZED_STACK_SCREENS.BUSINESS_STAFF_SCREEN} component={BusinessStaffScreen} />
    </Stack.Navigator>
  );
};
