import React, { FC, useEffect } from "react";
import { View, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { Button, Container, Screen, Space, Text } from "../../../components";
import { useTheme } from "../../../theme";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useBusiness, useMobileAdmin } from "../../../store";
import { useGetAdminMobileQuery } from "../../../services";
import TwoLetterLogoSvg from "../../../assets/images/svg-components/logo-letter-short";
import WelcomeImage from "../../../assets/images/svg-components/welcome-app";

GoogleSignin.configure({
  webClientId: "805426205047-fcegaam9bmap1dagccindjh0ko7oro68.apps.googleusercontent.com",
  offlineAccess: true,
});

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

  const { isLoading: isAdminMobileLoading } = useGetAdminMobileQuery(mobileAdminData.defaultData && skipToken);

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
    <Screen backgroundColor="white" statusBar="light-content">
      <Container direction="row" alignItems="center" justifyContent="center">
        <TwoLetterLogoSvg height={75} width={75} />
      </Container>
      <View
        style={{
          // justifyContent: "center",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <WelcomeImage height={"30%"} />
        <Space size="large" />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <Text
            preset="cardSubtitle"
            style={{
              fontWeight: "500",
            }}
            text="Welcome to the Shortwaits Admin App"
          />
          <Space size="small" />
          <Text
            preset="title2"
            text={
              "Where you're the captain of your business!\nExplore our tools to take control and drive your success."
            }
          />
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <Button
          style={{
            backgroundColor: Colors.brandSecondary,
          }}
          textStyle={{ color: Colors.white }}
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
          style={{ backgroundColor: Colors.brandSecondary1 }}
          textStyle={{
            fontWeight: "500",
            color: Colors.static_welcomeButtonText,
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
    </Screen>
  );
};
