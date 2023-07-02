import React, { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useFlipper } from "@react-navigation/devtools";

import { RootStackParamList } from "./navigation-types";
import { NAVIGATION_STACKS } from "./navigation-constants";
import { navigationRef, useBackButtonHandler } from "./navigation-utils";
import {
  ModalsNavigator,
  UnauthorizedNavigator,
  AuthorizedNavigator,
} from "./stacks";
import { useAuth, useBusiness, useComponentVisibility } from "../redux";
import { PremiumMembershipModal } from "../components";
import { Banner } from "../components/banners/banner";
import { useTheme } from "../theme";

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

  console.log("isAuthenticated>>>", isAuthenticated);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <RootStack.Screen
          name={NAVIGATION_STACKS.AUTHORIZED}
          component={AuthorizedNavigator}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name={NAVIGATION_STACKS.UNAUTHORIZED}
          component={UnauthorizedNavigator}
        />
      )}
      <RootStack.Screen
        options={{
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
        name={NAVIGATION_STACKS.MODALS}
        component={ModalsNavigator}
      />
    </RootStack.Navigator>
  );
};

type NavigationProps = Partial<
  React.ComponentProps<typeof NavigationContainer>
>;

export const AppNavigator = (props: NavigationProps): React.ReactElement => {
  useFlipper(navigationRef);
  useBackButtonHandler(canExit);
  const { isVisible } = useComponentVisibility("premiumMembership");

  return (
    <NavigationContainer ref={navigationRef} theme={DefaultTheme} {...props}>
      <Banner />
      <AppStack />
      <PremiumMembershipModal visible={isVisible} onDismiss={() => null} />
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
export const canExit = (routeName: string): boolean =>
  exitRoutes.includes(routeName);
