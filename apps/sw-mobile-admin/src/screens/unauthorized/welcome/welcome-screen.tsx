import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import React, { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { StyleSheet, View } from "react-native";
import { Settings } from "react-native-fbsdk-next";
import { Logo2, WelcomeImage } from "../../../assets";
import { Button, Container, Screen, ScrollView, Space, Text } from "../../../components";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useGetAdminMobileQuery } from "../../../services";
import { useBusiness, useMobileAdmin } from "../../../store";
import { getFontSize, getResponsiveHeight } from "../../../utils";

GoogleSignin.configure({
  webClientId: "805426205047-fcegaam9bmap1dagccindjh0ko7oro68.apps.googleusercontent.com",
  offlineAccess: true,
});
Settings.setAppID("693197073014015");

export interface WelcomeScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "welcome-screen">, StackNavigationProp<RootStackParamList>>;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
  const business = useBusiness();
  const mobileAdminData = useMobileAdmin();
  const intl = useIntl(); // Access the intl object

  const { isLoading: isAdminMobileLoading } = useGetAdminMobileQuery(mobileAdminData.shortwaits && skipToken);

  useEffect(() => {
    if (business?.isRegistrationCompleted === false) {
      navigation.navigate("onboarding-1-screen");
    }
  }, [navigation, business?.isRegistrationCompleted]);

  if (isAdminMobileLoading) return <Text>Loading ...</Text>;

  return (
    <Screen backgroundColor="white" statusBar="light-content">
      <Container alignItems="center" justifyContent="center">
        <Logo2 height={getFontSize(80)} width={getFontSize(80)} />
      </Container>
      <Space size="large" />
      <View style={styles.box1}>
        <WelcomeImage height={getResponsiveHeight(200)} width={getResponsiveHeight(200)} />
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Text preset="title2" style={styles.box2Text} text={intl.formatMessage({ id: "Welcome_Screen.title" })} />
            <Space size="tiny" />
            <Text preset="title3" text={intl.formatMessage({ id: "Welcome_Screen.description" })} />
          </ScrollView>
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <Button
          text={intl.formatMessage({ id: "Common.register" })}
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-up-screen",
            })
          }
        />
        <Space size="small" />
        <Button
          preset="link"
          text={intl.formatMessage({ id: "Common.login" })}
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-in-screen",
            })
          }
        />
        <Space size="tiny" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
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
