import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { EventScreen, PlansScreen } from "../../screens";
import { AuthenticatedStackParamList } from "../navigation-types";

const Stack = createStackNavigator<AuthenticatedStackParamList>();

export const AuthenticatedStackNavigator = () => {
  const { Colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name={"event-screen"} component={EventScreen} />
      <Stack.Screen name={"plans-screen"} component={PlansScreen} />
    </Stack.Navigator>
  );
};
