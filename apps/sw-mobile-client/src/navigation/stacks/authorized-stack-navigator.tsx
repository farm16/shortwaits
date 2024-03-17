import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { EventDetailsScreen, UserProfile } from "../../screens";
import { AuthorizedStackParamList } from "../navigation-types";

const Stack = createStackNavigator<AuthorizedStackParamList>();

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
      <Stack.Screen name={"event-detail-screen"} component={EventDetailsScreen} />
      <Stack.Screen name={"user-profile-screen"} component={UserProfile} />
    </Stack.Navigator>
  );
};
