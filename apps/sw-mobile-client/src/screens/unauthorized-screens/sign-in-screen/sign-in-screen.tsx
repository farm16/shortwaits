import {
  Button,
  Container,
  Facebook,
  Google,
  Logo2,
  Screen,
  Space,
  Text,
  TextFieldCard,
  getResponsiveHeight,
  onGoogleButtonPress,
  useDefaultHeaderHeight,
  useForm,
  useTheme,
} from "@shortwaits/shared-ui";
import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, AlertButton, StyleSheet, View } from "react-native";
import { UnauthorizedScreenProps } from "../../../navigation";
import { useLocalSignInMutation, useSocialSignInMutation } from "../../../services";

export function SignInScreen({ navigation }: UnauthorizedScreenProps<"sign-in-screen">) {
  const { Colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const intl = useIntl(); // Access the intl object
  const headerHeight = useDefaultHeaderHeight();
  const [localSignIn, localSignInResponse] = useLocalSignInMutation();
  const [socialSignUp, socialSignUpResponse] = useSocialSignInMutation();

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

  const initialValues = {
    email: "",
    password: "",
  };

  const { touched, errors, values, handleChange, handleSubmit, dirty } = useForm<"clientAppLocalSignIn">(
    {
      initialValues: {
        email: "", // Add the 'email' property with the appropriate type
        password: "",
      },
      onSubmit: formData => {
        localSignIn({
          email: formData.email,
          password: formData.password,
        });
      },
    },
    "clientAppLocalSignIn"
  );
  const handlePasswordVisibility = useCallback(() => {
    setIsVisible(visibility => !visibility);
  }, []);

  useEffect(() => {
    if (localSignInResponse?.isError) {
      const canRegister = localSignInResponse?.error?.data?.message === "User not registered";
      const buttons: AlertButton[] = [{ text: "Back", style: "cancel" }];
      if (canRegister) {
        buttons.push({
          text: "Register",
          onPress: () => {
            navigation.navigate("unauthorized", {
              screen: "sign-up-screen",
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
    } else {
      return;
    }
  }, [navigation, localSignInResponse?.error?.data?.message, localSignInResponse?.isError, intl]);

  return (
    <Screen preset="fixed" withHorizontalPadding statusBar="dark-content">
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo2 width={getResponsiveHeight(100)} height={getResponsiveHeight(100)} />
      </View>
      <TextFieldCard
        autoCapitalize="none"
        keyboardType="default"
        title={intl.formatMessage({
          id: "Sign_In_Screen.username",
        })}
        placeholder="bod_ross123@gmail.com"
        value={values.email}
        onChangeText={handleChange("email")}
        isTouched={touched.email}
        errors={errors.email}
      />
      <Space size="tiny" />
      <TextFieldCard
        secureTextEntry={!isVisible}
        title={intl.formatMessage({
          id: "Sign_In_Screen.password",
        })}
        placeholder=""
        value={values.password}
        rightIconOnPress={handlePasswordVisibility}
        rightIconName={isVisible ? "eye-off" : "eye"}
        rightIconColor={isVisible ? Colors.disabledText : Colors.brandPrimary}
        onChangeText={handleChange("password")}
        isTouched={touched.password}
        errors={errors.password}
      />
      <Button
        style={{
          alignSelf: "flex-end",
        }}
        preset="link"
        text={intl.formatMessage({
          id: "Sign_In_Screen.forgotPassword",
        })}
      />

      <Space />
      <Button preset="primary" onPress={() => handleSubmit()}>
        <Text
          style={{ color: "white" }}
          preset="social"
          text={intl.formatMessage({
            id: "Common.signIn",
          })}
        />
      </Button>

      <Container
        style={{
          marginVertical: getResponsiveHeight(35),
        }}
        direction="row"
        alignItems="center"
      >
        <View
          style={{
            height: 1,
            flex: 1,
            backgroundColor: Colors.disabledText,
          }}
        />
        <Text
          style={{
            marginHorizontal: 10,
          }}
          preset="subText"
          text="or"
        />
        <View
          style={{
            height: 1,
            flex: 1,
            backgroundColor: Colors.disabledText,
          }}
        />
      </Container>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button preset="social" onPress={handleFacebookSignIn}>
          <Facebook />
        </Button>
        <Space direction="vertical" />
        <Button preset="social" onPress={handleGoogleSignIn}>
          <Google />
        </Button>
      </View>
      <Space />
      <View style={styles.footer}>
        <Text
          preset="text"
          style={{ color: Colors.text }}
          text={intl.formatMessage({
            id: "Sign_In_Screen.doNotHaveAnAccount",
          })}
        />
        <Button
          preset="link"
          text={intl.formatMessage({
            id: "Sign_In_Screen.signUp",
          })}
          onPress={() => {
            navigation.navigate("unauthorized", { screen: "sign-up-screen" });
          }}
        />
      </View>
      <Space />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
