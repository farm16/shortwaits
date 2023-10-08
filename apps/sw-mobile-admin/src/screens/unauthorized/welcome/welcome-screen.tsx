import React, { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useIntl } from "react-intl";

import { Button, Container, Screen, Space, Text } from "../../../components";
import { useTheme } from "../../../theme";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useBusiness, useMobileAdmin } from "../../../store";
import { useGetAdminMobileQuery } from "../../../services";
import { Logo2, WelcomeImage } from "../../../assets";

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
  const intl = useIntl(); // Access the intl object

  const { isLoading: isAdminMobileLoading } = useGetAdminMobileQuery(mobileAdminData.shortwaits && skipToken);

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
        <Logo2 height={75} width={75} />
      </Container>
      <View style={styles.box1}>
        <WelcomeImage height={"30%"} />
        <Space size="large" />
        <View style={styles.box2}>
          <Text
            preset="cardSubtitle"
            style={styles.box2Text}
            text={intl.formatMessage({ id: "Welcome_Screen.title" })}
          />
          <Space size="small" />
          <Text preset="title2" text={intl.formatMessage({ id: "Welcome_Screen.description" })} />
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <Button
          style={{
            backgroundColor: Colors.brandSecondary,
          }}
          textStyle={{ color: Colors.white }}
          preset="primary"
          text={intl.formatMessage({ id: "Common.register" })}
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
          text={intl.formatMessage({ id: "Common.login" })}
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

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  box2: {
    width: "100%",
    paddingHorizontal: 16,
  },
  box2Text: {
    fontWeight: "500",
  },
});
