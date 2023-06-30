import React, { FC, useEffect } from "react";
import { View, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import SplashScreen from "react-native-splash-screen";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Button, Space, Text } from "../../../components";
import { useTheme } from "../../../theme";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "../../../navigation";
import { useBusiness, useMobileAdmin } from "../../../redux";
import { useGetAdminMobileQuery } from "../../../services";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

export interface WelcomeScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "welcome-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
  const { Colors } = useTheme();
  const business = useBusiness();
  const mobileAdminData = useMobileAdmin();

  const { isLoading: isAdminMobileLoading } = useGetAdminMobileQuery(
    mobileAdminData.defaultData && skipToken
  );

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (business?.isRegistrationCompleted === false) {
      navigation.navigate("onboarding-1-screen");
    }
  }, [navigation, business?.isRegistrationCompleted]);

  if (isAdminMobileLoading) return <Text>Loading ...</Text>;

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        flex: 1,
        backgroundColor: Colors.brandSecondary,
      }}
    >
      <StatusBar
        backgroundColor={Colors.brandSecondary}
        barStyle="light-content"
      />
      <View style={{ justifyContent: "center", marginBottom: 100, flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
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
            backgroundColor: Colors.static.welcomeButtonBackground,
          }}
          textStyle={{ color: Colors.static.welcomeButtonText }}
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
          textStyle={{
            fontWeight: "500",
            color: Colors.static.welcomeLinkText,
          }}
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
