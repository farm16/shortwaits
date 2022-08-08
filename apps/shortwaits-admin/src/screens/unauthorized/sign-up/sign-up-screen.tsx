import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"

import { Screen, Button, Text, Space, Logo } from "@/components"
import Facebook from "@/assets/icons/facebook.svg"
import Google from "@/assets/icons/google.svg"
import EMail from "@/assets/icons/email.svg"
import { CompositeNavigationProp } from "@react-navigation/native"
import {
  RootStackParamList,
  UnauthorizedStackParamList
} from "@/navigation/navigation-types"

export interface SignUpScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "sign-up-screen">,
    StackNavigationProp<RootStackParamList>
  >
}

export const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  return (
    <Screen preset="fixed" unsafe style={styles.container}>
      <Space size="large" />
      <Logo center />
      <Text preset="title3" text="create account" />
      <View style={styles.formContainer}>
        <Button icon={Facebook} preset="social" text="with Facebook" />
        <Space size="small" />
        <Button icon={Google} preset="social" text="with Google" />
        <Space size="small" />
        <Button
          icon={EMail}
          preset="social"
          text="with your email"
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-up-with-email-screen"
            })
          }
        />
        <Space size="large" />
        <View style={styles.footerContainer}>
          <Button text="T" preset="subLink" onPress={() => null} />
          <Text text={"& "} preset="text3" />
          <Button text="C" preset="subLink" onPress={() => null} />
        </View>
        <Space size="xLarge" />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start"
  },
  footerContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  subLink: { fontWeight: "bold" }
})
