import React from "react"
import { StyleSheet } from "react-native"
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack"

import {
  WelcomeScreen,
  SignInScreen,
  SignUpScreen,
  SignInWithEmail,
  SignUpWithEmail,
  Onboarding1Screen,
  Onboarding2Screen
} from "@/screens"
import { BackButton } from "@/components"
import { UNAUTHORIZED_SCREENS } from "../navigation-constants"
import { useTheme } from "@/theme"

const {
  WELCOME_SCREEN,
  SIGN_IN_SCREEN,
  SIGN_IN_WITH_EMAIL_SCREEN,
  SIGN_UP_SCREEN,
  SIGN_UP_WITH_EMAIL_SCREEN,
  ONBOARDING_1_SCREEN,
  ONBOARDING_2_SCREEN
} = UNAUTHORIZED_SCREENS

const Stack = createStackNavigator()

export const UnauthorizedNavigator = () => {
  const {
    Colors,
    Common: { textPresets }
  } = useTheme()

  const headerStyles = StyleSheet.create({
    withBorder: {
      backgroundColor: Colors.background
    },
    withOutBorder: {
      backgroundColor: Colors.background,
      shadowColor: Colors.transparent,
      borderBottomWidth: 0,
      elevation: 0, // for Android
      shadowOffset: {
        width: 0,
        height: 0 // for iOS
      }
    }
  })

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false
      }}
    >
      <Stack.Screen name={WELCOME_SCREEN} component={WelcomeScreen} />
      <Stack.Group
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerStyle: headerStyles.withOutBorder,
          headerTitle: "",
          headerTitleAlign: "center",
          headerTitleStyle: {
            ...textPresets.headerTitle,
            color: Colors.darkText,
            position: "absolute",
            alignSelf: "center"
          },
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />
        })}
      >
        <Stack.Screen name={SIGN_IN_SCREEN} component={SignInScreen} />
        <Stack.Screen
          name={SIGN_IN_WITH_EMAIL_SCREEN}
          component={SignInWithEmail}
        />
        <Stack.Screen name={SIGN_UP_SCREEN} component={SignUpScreen} />
        <Stack.Screen
          name={SIGN_UP_WITH_EMAIL_SCREEN}
          component={SignUpWithEmail}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: headerStyles.withOutBorder,
          headerTitleAlign: "center",
          headerTitleStyle: {
            ...textPresets.headerTitle,
            color: Colors.text,
            position: "absolute",
            alignSelf: "center"
          }
        }}
      >
        <Stack.Screen
          name={ONBOARDING_1_SCREEN}
          component={Onboarding1Screen}
        />
        <Stack.Screen
          name={ONBOARDING_2_SCREEN}
          component={Onboarding2Screen}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
