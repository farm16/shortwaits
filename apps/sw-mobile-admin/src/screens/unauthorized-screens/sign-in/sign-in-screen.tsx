import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Container, Facebook, Google, Screen, Space, Text, TextFieldCard, useTheme, ActivityIndicator, BottomSheet, BottomSheetType } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, AlertButton, StyleSheet, View } from "react-native";
import { useForm, useGoogleAuth, useFacebookAuth } from "../../../hooks";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useLocalSignInMutation } from "../../../services";

export interface RegisterWithEmailScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "sign-in-screen">, StackNavigationProp<RootStackParamList>>;
}

export const SignInScreen: FC<RegisterWithEmailScreenProps> = ({ navigation }) => {
  const { Colors } = useTheme();
  const forgotPasswordRef = useRef<BottomSheetType>(null);
  const [isVisible, setIsVisible] = useState(false);
  const intl = useIntl();
  const [localSignIn, localSignInResponse] = useLocalSignInMutation();
  const { isLoading: isGoogleAuthLoading, error: googleAuthError, handleGoogleAuth } = useGoogleAuth();
  const { isLoading: isFacebookAuthLoading, error: facebookAuthError, handleFacebookAuth } = useFacebookAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text preset="headerTitle" text={"Sign in"} />,
    });
  }, [intl, navigation]);

  const isLoading = localSignInResponse.isLoading || isGoogleAuthLoading || isFacebookAuthLoading;

  useEffect(() => {
    if (googleAuthError || facebookAuthError) {
      const errorMessage = googleAuthError || facebookAuthError || intl.formatMessage({ id: "Common.error.message" });
      Alert.alert(
        intl.formatMessage({
          id: "Common.error.title",
        }),
        errorMessage
      );
    }
  }, [facebookAuthError, googleAuthError, intl]);

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

  const {
    touched: forgotPasswordTouched,
    errors: forgotPasswordErrors,
    values: forgotPasswordValues,
    handleChange: forgotPasswordHandleChange,
    handleSubmit: forgotPasswordHandleSubmit,
    dirty: forgotPasswordDirty,
  } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        console.log("forgotPassword >>>", formData);
        handleForgotPassword();
      },
    },
    "forgotPassword"
  );

  console.log("errors", errors);

  const handleForgotPassword = () => {
    Alert.alert(
      "Forgot Password",
      "You will receive an email with instructions to reset your password",
      [
        {
          text: "Send",
          onPress: () => {
            forgotPasswordRef.current?.forceClose();
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            forgotPasswordRef.current?.forceClose();
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Screen preset="scroll" unsafe withHorizontalPadding>
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
      <Text
        preset="textLarge"
        style={{
          alignSelf: "flex-end",
          color: Colors.brandAccent,
          marginTop: 5,
          fontWeight: "700",
          textDecorationLine: "underline",
        }}
        text={intl.formatMessage({
          id: "Sign_In_Screen.forgotPassword",
        })}
        onPress={() => {
          forgotPasswordRef.current?.expand();
        }}
      />
      <Space />
      <Space />
      <Button
        preset="primary"
        onPress={() => handleSubmit()}
        text={intl.formatMessage({
          id: "Common.signIn",
        })}
      />
      <Container
        style={{
          marginTop: 35,
          marginBottom: 35,
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
      <Button preset="social" onPress={handleFacebookAuth} style={styles.socialButton}>
        <Container style={styles.socialButtonText}>
          <Facebook style={styles.socialIcon} />
          <Text
            preset="social"
            text={intl.formatMessage({
              id: "Sign_In_Screen.facebook",
            })}
          />
        </Container>
      </Button>
      <Space size="small" />
      <Button preset="social" onPress={handleGoogleAuth} style={styles.socialButton}>
        <Container style={styles.socialButtonText}>
          <Google style={styles.socialIcon} />
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
          preset="textLarge"
          text={intl.formatMessage({
            id: "Sign_In_Screen.doNotHaveAnAccount",
          })}
        />
        <Text
          preset="textLarge"
          style={{
            color: Colors.brandAccent,
            marginLeft: 5,
            fontWeight: "700",
            textDecorationLine: "underline",
          }}
          text={intl.formatMessage({
            id: "Sign_In_Screen.signUp",
          })}
          onPress={() => {
            navigation.navigate("unauthorized", { screen: "sign-up-screen" });
          }}
        />
      </View>
      <Space />
      <BottomSheet ref={forgotPasswordRef}>
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Space />
          <View style={{ alignItems: "center" }}>
            <Text preset="headerTitle" text={"Forgot Password"} />
          </View>
          <Space size="tiny" />
          <TextFieldCard
            title={"Email"}
            placeholder="Enter your email"
            value={forgotPasswordValues.email}
            onChangeText={forgotPasswordHandleChange("email")}
            isTouched={forgotPasswordTouched.email}
            errors={forgotPasswordErrors.email}
          />
          <Space />
          <Button text={"Send"} preset={forgotPasswordDirty ? "secondary" : "secondary-disabled"} onPress={() => forgotPasswordHandleSubmit()} />
        </View>
      </BottomSheet>
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
  socialButton: {
    width: "100%",
    justifyContent: "center",
  },
  socialButtonText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  socialIcon: {
    position: "absolute",
    left: 0,
  },
});
