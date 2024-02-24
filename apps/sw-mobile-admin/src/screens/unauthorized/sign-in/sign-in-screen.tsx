import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Container, FacebookIcon, GoogleIcon, Screen, Space, Text, TextFieldCard, useTheme } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { ActivityIndicator, Alert, AlertButton, StyleSheet, View } from "react-native";
import { useForm, useGoogleAuth } from "../../../hooks";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useLocalSignInMutation } from "../../../services";

export interface RegisterWithEmailScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "sign-in-screen">, StackNavigationProp<RootStackParamList>>;
}

export const SignInScreen: FC<RegisterWithEmailScreenProps> = ({ navigation }) => {
  const { Colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const intl = useIntl();
  const [localSignIn, localSignInResponse] = useLocalSignInMutation();
  const { isLoading: isGoogleAuthLoading, error: googleAuthError, handleGoogleAuth } = useGoogleAuth();

  const isLoading = localSignInResponse.isLoading || isGoogleAuthLoading;

  if (googleAuthError) {
    Alert.alert(
      intl.formatMessage({
        id: "Common.error.title",
      }),
      intl.formatMessage({
        id: "Common.error.message",
      })
    );
  }

  const initialValues = {
    email: "",
    username: "",
    password: "",
  };
  const { touched, errors, values, handleChange, handleSubmit, dirty } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        localSignIn({
          password: formData.password,
          username: formData.email,
          email: formData.email,
        });
      },
    },
    "adminAppLocalSignIn"
  );

  console.log("errors", errors);

  const handlePasswordVisibility = useCallback(() => {
    setIsVisible(visibility => !visibility);
  }, []);

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
  }

  if (isLoading) return <ActivityIndicator />;

  return (
    <Screen preset="scroll" unsafe unsafeBottom withHorizontalPadding>
      {/* <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Logo1 height="25%" />
      </View> */}
      <Space />
      <TextFieldCard
        autoCapitalize="none"
        keyboardType="default"
        title={intl.formatMessage({
          id: "Sign_In_Screen.email",
        })}
        placeholder={intl.formatMessage({
          id: "Sign_In_Screen.email.placeholder",
        })}
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
      <Space size="tiny" />
      <Button
        style={{ marginLeft: "auto" }}
        preset="link"
        text={intl.formatMessage({
          id: "Sign_In_Screen.forgotPassword",
        })}
      />
      <Space size="large" />
      <Button preset="social" onPress={handleGoogleAuth}>
        <FacebookIcon width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
        <Container style={styles.socialButtonContainer}>
          <Text
            preset="social"
            text={intl.formatMessage({
              id: "Sign_In_Screen.facebook",
            })}
          />
        </Container>
      </Button>
      <Space size="small" />
      <Button preset="social" onPress={handleGoogleAuth}>
        <Container style={styles.socialButtonContainer}>
          <GoogleIcon width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
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
  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
