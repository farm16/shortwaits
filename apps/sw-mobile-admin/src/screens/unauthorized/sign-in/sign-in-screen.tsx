import React, { FC, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, AlertButton, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";

import { useTheme } from "../../../theme";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useForm } from "../../../hooks";
import { useLocalSignInMutation, useSocialSignInMutation } from "../../../services";
import { Container, Button, Text, Space, TextFieldCard, Screen } from "../../../components";
import Facebook from "../../../assets/icons/facebook.svg";
import Google from "../../../assets/icons/google.svg";
import { onGoogleButtonPress } from "../../../utils";
import { Logo1 } from "../../../assets";
import { useIntl } from "react-intl";

export interface RegisterWithEmailScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "sign-in-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export const SignInScreen: FC<RegisterWithEmailScreenProps> = ({ navigation }) => {
  const { Colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const intl = useIntl(); // Access the intl object

  const [localSignIn, localSignInResponse] = useLocalSignInMutation();
  const [socialSignUp, socialSignUpResponse] = useSocialSignInMutation();

  const initialValues = {
    username: "",
    password: "",
  };
  const { touched, errors, values, handleChange, handleSubmit, dirty } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        localSignIn({
          password: formData.password,
          username: formData.username,
        });
      },
    },
    "userLocalSignIn"
  );
  const handlePasswordVisibility = useCallback(() => {
    setIsVisible(visibility => !visibility);
  }, []);
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const authCode = await onGoogleButtonPress();
      await socialSignUp({
        provider: "google",
        authCode,
      });
    } catch (error) {
      Alert.alert(
        intl.formatMessage({
          id: "Common.error.title",
        }),
        intl.formatMessage({
          id: "Common.error.message",
        })
      );
      console.log("Error during Google sign-up:", error);
    }
  }, [intl, socialSignUp]);

  const handleFacebookSignIn = useCallback(async () => {
    try {
      const authCode = await onGoogleButtonPress();
      await socialSignUp({
        provider: "facebook",
        authCode,
      });
    } catch (error) {
      Alert.alert(
        intl.formatMessage({
          id: "Common.error.title",
        }),
        intl.formatMessage({
          id: "Common.error.message",
        })
      );
      console.log("Error during Facebook sign-up:", error);
    }
  }, [intl, socialSignUp]);

  useEffect(() => {
    if (localSignInResponse.isError) {
      const canRegister = localSignInResponse?.error?.data?.message === "User not registered";
      const buttons: AlertButton[] = [{ text: "Back", style: "cancel" }];
      if (canRegister) {
        buttons.push({
          text: "Register",
          onPress: () => {
            navigation.navigate("unauthorized", {
              screen: "sign-up-with-email-screen",
            });
          },
          style: "default",
        });
      }
      Alert.alert(
        intl.formatMessage({
          id: "Common.error.title",
        }),
        localSignInResponse?.error?.data?.message ??
          intl.formatMessage({
            id: "Common.error.message",
          }),
        buttons,
        {
          cancelable: true,
        }
      );
    } else return;
  }, [navigation, localSignInResponse?.error?.data?.message, localSignInResponse.isError, intl]);

  if (localSignInResponse.isLoading || socialSignUpResponse.isLoading) return <ActivityIndicator />;

  return (
    <Screen preset="fixed" unsafe unsafeBottom withHorizontalPadding>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Logo1 height="25%" />
      </View>
      <TextFieldCard
        autoCapitalize="none"
        keyboardType="default"
        title={intl.formatMessage({
          id: "Sign_In_Screen.username",
        })}
        placeholder="bod_ross123"
        value={values.username}
        onChangeText={handleChange("username")}
        isTouched={touched.username}
        errors={errors.username}
      />
      <Space size="small" />
      <TextFieldCard
        secureTextEntry={!isVisible}
        title={intl.formatMessage({
          id: "Sign_In_Screen.password",
        })}
        placeholder=""
        value={values.password}
        rightIconOnPress={handlePasswordVisibility}
        rightIconName={isVisible ? "eye-off" : "eye"}
        rightIconColor={isVisible ? Colors.disabledText : Colors.brandSecondary}
        onChangeText={handleChange("password")}
        isTouched={touched.password}
        errors={errors.password}
      />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Button
          style={{ marginLeft: "auto" }}
          preset="subLink"
          text={intl.formatMessage({
            id: "Sign_In_Screen.forgotPassword",
          })}
        />
      </View>
      <Space size="large" />
      <Button preset="primary" style={{ backgroundColor: Colors.brandSecondary }} onPress={() => handleSubmit()}>
        <Text
          style={{ color: "white" }}
          preset="social"
          text={intl.formatMessage({
            id: "Common.signIn",
          })}
        />
      </Button>
      <Space size="large" />
      <Button preset="social" onPress={handleFacebookSignIn}>
        <Facebook width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
        <Container style={styles.buttonContainer}>
          <Text
            preset="social"
            text={intl.formatMessage({
              id: "Sign_In_Screen.facebook",
            })}
          />
        </Container>
      </Button>
      <Space size="small" />
      <Button preset="social" onPress={handleGoogleSignIn}>
        <Container style={styles.buttonContainer}>
          <Google width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
          <Text
            preset="social"
            text={intl.formatMessage({
              id: "Sign_In_Screen.google",
            })}
          />
        </Container>
      </Button>
      <Space />
      <View style={styles.footer}>
        <Text
          preset="subLink"
          style={{ color: Colors.text }}
          text={intl.formatMessage({
            id: "Sign_In_Screen.dontHaveAnAccount",
          })}
        />
        <Space direction="vertical" />
        <Button
          preset="subLink"
          textStyle={{ color: Colors.brandSecondary6 }}
          text={intl.formatMessage({
            id: "Sign_In_Screen.signUp",
          })}
          onPress={() => {
            navigation.navigate("unauthorized", { screen: "sign-up-screen" });
          }}
        />
      </View>
      <Space size="xLarge" />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
