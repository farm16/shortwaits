import { createStackNavigator } from "@react-navigation/stack";
import { BackButton } from "@shortwaits/shared-ui";
import React, { useCallback } from "react";
import { SignInScreen, SignUpScreen, WelcomeScreen } from "../../screens";
import { UNAUTHORIZED_SCREENS } from "../navigation-constants";
import { UnauthorizedStackParamList } from "../navigation-types";

const Stack = createStackNavigator<UnauthorizedStackParamList>();

export const UnauthorizedNavigator = () => {
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
      initialRouteName={UNAUTHORIZED_SCREENS.WELCOME_SCREEN}
    >
      <Stack.Screen options={{ headerShown: false }} name={UNAUTHORIZED_SCREENS.WELCOME_SCREEN} component={WelcomeScreen} />
      <Stack.Screen name={UNAUTHORIZED_SCREENS.SIGN_IN_SCREEN} component={SignInScreen} />
      <Stack.Screen name={UNAUTHORIZED_SCREENS.SIGN_UP_SCREEN} component={SignUpScreen} />
    </Stack.Navigator>
  );
};
