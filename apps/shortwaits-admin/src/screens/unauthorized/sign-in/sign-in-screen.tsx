import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  Screen,
  Logo,
  Button,
  Text,
  Space,
} from "@shortwaits/admin/components";
import Facebook from "@shortwaits/admin/assets/icons/facebook.svg";
import Google from "@shortwaits/admin/assets/icons/google.svg";
import EMail from "@shortwaits/admin/assets/icons/email.svg";
import { useTheme } from "@shortwaits/admin/theme";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "@shortwaits/admin/navigation/navigation-types";
import { CompositeNavigationProp } from "@react-navigation/native";

export interface RegisterWithEmailScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "sign-in-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export const SignInScreen: FC<RegisterWithEmailScreenProps> = ({
  navigation,
}) => {
  const { Colors } = useTheme();

  return (
    <Screen preset="fixed">
      <Space size="large" />
      <Logo center />
      <Text preset="title3" text="Sign in" />
      <View style={styles.container}>
        <Button icon={Facebook} preset="social" text="with Facebook" />
        <Space size="small" />
        <Button icon={Google} preset="social" text="with Google" />
        <Space size="small" />
        <Button
          icon={EMail}
          preset="social"
          text="with your email"
          onPress={() => {
            navigation.navigate("unauthorized", {
              screen: "sign-in-with-email-screen",
            });
          }}
        />
        <Space size="large" />
        <View style={styles.footer}>
          <Text
            preset="subLink"
            style={{ color: Colors.text }}
            text="Don't have an account?   "
          />
          <Button
            preset="subLink"
            text="Sign up"
            onPress={() => {
              navigation.navigate("unauthorized", { screen: "sign-up-screen" });
            }}
          />
        </View>
        <Space size="xLarge" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
