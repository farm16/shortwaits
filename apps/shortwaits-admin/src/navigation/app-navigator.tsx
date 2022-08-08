import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useFlipper } from "@react-navigation/devtools"

import { RootStackParamList } from "./navigation-types"
import { NAVIGATION_STACKS } from "./navigation-constants"
import { navigationRef, useBackButtonHandler } from "./navigation-utils"
import {
  ModalsNavigator,
  UnauthorizedNavigator,
  AuthorizedNavigator
} from "./stacks"
import { useUser } from "@/hooks/useUser"
import { useAuth } from "@/hooks/useAuth"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { useGetBusinessQuery, useGetAdminMobileQuery } from "@/services/api"

const RootStack = createStackNavigator<RootStackParamList>()

const AppStack = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const auth = useAuth()
  const user = useUser()

  const { data, isSuccess } = useGetBusinessQuery(
    user?.businesses.length > 0 ? user.businesses[0] : skipToken
  )

  useGetAdminMobileQuery({ skipToken: isSuccess })

  useEffect(() => {
    if (auth.token && user?.registrationState?.isCompleted) {
      setIsAuthenticated(true)
    }
  }, [isAuthenticated, auth.token, user])

  useEffect(() => {
    if (!auth.token) {
      setIsAuthenticated(false)
    }
  }, [isAuthenticated, auth.token])

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {isAuthenticated ? (
        <RootStack.Screen
          name={NAVIGATION_STACKS.AUTHORIZED}
          component={AuthorizedNavigator}
          options={{
            headerShown: false,
            animationEnabled: false
          }}
        />
      ) : (
        <RootStack.Screen
          name={NAVIGATION_STACKS.UNAUTHORIZED}
          component={UnauthorizedNavigator}
        />
      )}
      <RootStack.Screen
        name={NAVIGATION_STACKS.MODALS}
        component={ModalsNavigator}
      />
    </RootStack.Navigator>
  )
}

type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>>

export const AppNavigator = (props: NavigationProps): React.ReactElement => {
  useFlipper(navigationRef)
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string): boolean =>
  exitRoutes.includes(routeName)
