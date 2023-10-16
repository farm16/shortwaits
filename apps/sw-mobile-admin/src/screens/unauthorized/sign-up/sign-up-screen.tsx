import React, { FC, useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";

import { Screen, Button, Text, Space, Container } from "../../../components";
import Facebook from "../../../assets/icons/facebook.svg";
import Google from "../../../assets/icons/google.svg";
import EMail from "../../../assets/icons/email.svg";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useTheme } from "../../../theme";
import { useSocialSignUpMutation } from "../../../services";
import { onGoogleButtonPress } from "../../../utils";
import { ActivityIndicator } from "react-native-paper";
import { Logo1 } from "../../../assets/images/svg-components/logo-1";
import { useIntl } from "react-intl";

export interface SignUpScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "sign-up-screen">, StackNavigationProp<RootStackParamList>>;
}

export const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { Colors } = useTheme();
  const intl = useIntl(); // Access the intl object
  const [socialSignUp, { isLoading }] = useSocialSignUpMutation();

  const handleGoogleSignUp = useCallback(async () => {
    try {
      const authCode = await onGoogleButtonPress();
      await socialSignUp({
        provider: "google",
        authCode,
      });
    } catch (error) {
      Alert.alert("Oops", "Something went wrong. Please try again.");
      console.log("Error during Google sign-up:", error);
    }
  }, [socialSignUp]);

  const handleFacebookSignUp = useCallback(async () => {
    try {
      const authCode = await onGoogleButtonPress();
      await socialSignUp({
        provider: "google",
        authCode,
      });
    } catch (error) {
      Alert.alert("Oops", "Something went wrong. Please try again.");
      console.log("Error during Google sign-up:", error);
    }
  }, [socialSignUp]);

  if (isLoading) return <ActivityIndicator />;

  return (
    <Screen preset="fixed" withHorizontalPadding>
      <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 100, flex: 1 }}>
        <Logo1 height="25%" />
        <Text
          style={{
            color: Colors.subText,
            textTransform: "uppercase",
            fontWeight: "500",
            marginTop: 21,
            alignSelf: "center",
          }}
          text={intl.formatMessage({ id: "Sign_Up_Screen.title" })}
        />
      </View>

      <View style={styles.formContainer}>
        <Button preset="social">
          <Facebook width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
          <Container style={styles.buttonContainer}>
            <Text preset="social">{intl.formatMessage({ id: "Sign_Up_Screen.facebook" })}</Text>
          </Container>
        </Button>
        <Space size="small" />
        <Button preset="social" onPress={handleGoogleSignUp}>
          <Google width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
          <Container style={styles.buttonContainer}>
            <Text preset="social">{intl.formatMessage({ id: "Sign_Up_Screen.google" })}</Text>
          </Container>
        </Button>
        <Space size="small" />
        <Button
          preset="social"
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-up-with-email-screen",
            })
          }
        >
          <EMail width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
          <Container style={styles.buttonContainer}>
            <Text preset="social">{intl.formatMessage({ id: "Sign_Up_Screen.email" })}</Text>
          </Container>
        </Button>
        <Space />
        <Button preset="link" onPress={() => {}}>
          <Container direction="row">
            <Text text="T" preset="link" />
            <Text text="&" preset="link" />
            <Text text="C" preset="link" />
          </Container>
        </Button>
        <Space />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  subLink: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
