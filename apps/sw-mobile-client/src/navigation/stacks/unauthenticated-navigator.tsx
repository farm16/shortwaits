import { createStackNavigator } from "@react-navigation/stack";
import { BackButton } from "@shortwaits/shared-ui";
import React, { useCallback } from "react";
import { SignInScreen, SignUpScreen, WelcomeScreen } from "../../screens";
import { UnauthenticatedStackParamList } from "../navigation-types";

const Stack = createStackNavigator<UnauthenticatedStackParamList>();

export const UnauthenticatedNavigator = () => {
  const renderButton = useCallback(({ navigation }: any) => {
    return <BackButton onPress={() => navigation.goBack()} />;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => {
        return {
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => renderButton({ navigation }),
          headerTransparent: true,
        };
      }}
      initialRouteName={"welcome-screen"}
    >
      <Stack.Screen options={{ headerShown: false }} name={"welcome-screen"} component={WelcomeScreen} />
      <Stack.Screen name={"sign-in-screen"} component={SignInScreen} />
      <Stack.Screen name={"sign-up-screen"} component={SignUpScreen} />
    </Stack.Navigator>
  );
};
