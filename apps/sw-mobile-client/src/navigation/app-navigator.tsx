import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useAuth } from "../store";
import { rootStack } from "./navigation-constants";
import { RootStackParamList } from "./navigation-types";
import { navigationRef, useBackButtonHandler } from "./navigation-utils";
import { AuthenticatedTabNavigator, UnauthenticatedNavigator } from "./stacks";
import { AuthenticatedStackNavigator } from "./stacks/authenticated-stack-navigator";

const RootStack = createStackNavigator<RootStackParamList>();

const AppStack = () => {
  const auth = useAuth();
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {auth?.token ? (
        <>
          <RootStack.Screen
            name={rootStack["authenticated-tab"]}
            component={AuthenticatedTabNavigator}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <RootStack.Screen name={rootStack["authenticated-stack"]} component={AuthenticatedStackNavigator} />
        </>
      ) : (
        <RootStack.Screen name={rootStack["unauthenticated-stack"]} component={UnauthenticatedNavigator} />
      )}
    </RootStack.Navigator>
  );
};

type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>>;

export const AppNavigator = (props: NavigationProps): React.ReactElement => {
  useBackButtonHandler(canExit);
  return (
    <NavigationContainer ref={navigationRef} theme={DefaultTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = "AppNavigator";

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"];
export const canExit = (routeName: string): boolean => exitRoutes.includes(routeName);
