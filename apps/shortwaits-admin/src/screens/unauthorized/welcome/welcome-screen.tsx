import React, { FC, useEffect } from "react";
import { View, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import SplashScreen from "react-native-splash-screen";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Button, Space, Spinner, Text } from "@shortwaits/admin/components";
import { useTheme } from "@shortwaits/admin/theme";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "@shortwaits/admin/navigation/navigation-types";
import { useUser } from "@shortwaits/admin/hooks/useUser";

export interface WelcomeScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "welcome-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
  const { Colors } = useTheme();
  const userState = useUser();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (userState) {
      navigation.navigate("onboarding-1-screen");
    }
  }, [userState]);

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        flex: 1,
        backgroundColor: Colors.brandSecondary,
      }}
    >
      <StatusBar barStyle="light-content" />
      <View style={{ justifyContent: "center", marginBottom: 100, flex: 1 }}>
        <Text
          style={{
            fontSize: 37,
            lineHeight: 37,
            fontStyle: "italic",
            fontWeight: "bold",
            color: "white",
          }}
        >
          SHORT{"\n"}WAITS
        </Text>
      </View>

      <View style={{ alignItems: "center", position: "absolute", bottom: 0 }}>
        <Button
          style={{
            backgroundColor: Colors.white,
          }}
          textStyle={{ color: Colors.brandSecondary6 }}
          preset="primary"
          text="Register"
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-up-screen",
            })
          }
        />
        <Space />
        <Button
          style={{ backgroundColor: Colors.transparent }}
          textStyle={{ fontWeight: "bold", color: Colors.white }}
          preset="primary"
          text="Login"
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-in-screen",
            })
          }
        />
        <Space size="large" />
      </View>
    </SafeAreaView>
  );
};
