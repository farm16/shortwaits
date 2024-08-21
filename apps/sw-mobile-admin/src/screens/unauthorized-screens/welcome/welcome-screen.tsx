import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Container, Logo2, Screen, ScrollView, Space, Text, WelcomeImage, getResponsiveFontSize } from "@shortwaits/shared-ui";
import React, { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { Dimensions, StyleSheet, View } from "react-native";
import { Settings as FacebookSettings } from "react-native-fbsdk-next";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useBusiness } from "../../../store";

GoogleSignin.configure({
  webClientId: "805426205047-fcegaam9bmap1dagccindjh0ko7oro68.apps.googleusercontent.com",
  offlineAccess: true,
  iosClientId: "805426205047-mlghv968heekr2u7egondvv621g17h81.apps.googleusercontent.com",
});
FacebookSettings.initializeSDK();

export interface WelcomeScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "welcome-screen">, StackNavigationProp<RootStackParamList>>;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
  const business = useBusiness();
  const intl = useIntl(); // Access the intl object

  useEffect(() => {
    if (business?.isRegistrationCompleted === false) {
      navigation.navigate("onboarding-1-screen");
    }
  }, [navigation, business?.isRegistrationCompleted]);

  const welcomeImageWidth = Dimensions.get("window").width;
  return (
    <Screen backgroundColor="white">
      <Container alignItems="center" justifyContent="center">
        <Logo2 height={getResponsiveFontSize(80)} width={getResponsiveFontSize(80)} />
      </Container>
      <Space size="large" />
      <View style={styles.box1}>
        <WelcomeImage width={welcomeImageWidth} />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ marginTop: "auto", paddingVertical: 16 }}>
            <Text preset="titleXLarge" text={intl.formatMessage({ id: "Welcome_Screen.title" })} />
            <Space size="small" />
            <Text preset="textLarge" text={intl.formatMessage({ id: "Welcome_Screen.description" })} />
          </ScrollView>
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <Button
          text={"Sign in"}
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-in-screen",
            })
          }
        />
        <Space size="small" />
        <Button
          preset="link"
          text={"Create an account"}
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-up-screen",
            })
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
    // backgroundColor: "green",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "green",
    width: "100%",
    paddingHorizontal: 16,
  },
  box2Text: {
    fontWeight: "500",
  },
});
