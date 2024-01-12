import { useFlipper } from "@react-navigation/devtools";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useAuth, useBusiness } from "../store";
import { NAVIGATION_STACKS } from "./navigation-constants";
import { RootStackParamList } from "./navigation-types";
import { navigationRef, useBackButtonHandler } from "./navigation-utils";
import { AuthorizedStackNavigator, AuthorizedTabNavigator, ModalsNavigator, UnauthorizedNavigator } from "./stacks";

const RootStack = createStackNavigator<RootStackParamList>();

const AppStack = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = useAuth();
  const business = useBusiness();

  useEffect(() => {
    if (auth.token && business?.isRegistrationCompleted) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated, auth.token, business?.isRegistrationCompleted]);

  useEffect(() => {
    if (auth.token === null) {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, auth]);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <RootStack.Screen
            name={NAVIGATION_STACKS.AUTHORIZED_TAB}
            component={AuthorizedTabNavigator}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <RootStack.Screen name={NAVIGATION_STACKS.AUTHORIZED_STACK} component={AuthorizedStackNavigator} />
        </>
      ) : (
        <RootStack.Screen name={NAVIGATION_STACKS.UNAUTHORIZED} component={UnauthorizedNavigator} />
      )}
      <RootStack.Screen
        options={{
          presentation: "modal",
          headerTitleAlign: "center",
        }}
        name={NAVIGATION_STACKS.MODALS}
        component={ModalsNavigator}
      />
    </RootStack.Navigator>
  );
};

type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>>;

export const AppNavigator = (props: NavigationProps): React.ReactElement => {
  useFlipper(navigationRef);
  useBackButtonHandler(canExit);

  return (
    <NavigationContainer
      // onReady={() => {
      //   BootSplash.hide();
      // }}
      ref={navigationRef}
      theme={DefaultTheme}
      {...props}
    >
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
