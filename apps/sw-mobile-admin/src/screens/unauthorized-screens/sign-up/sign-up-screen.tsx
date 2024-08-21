import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Container, Facebook, ActivityIndicator, Google, Screen, Space, TermsAndConditions, Text, TextFieldCard, useForm, useTheme } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, StyleSheet, View } from "react-native";
import { shortwaitsApi } from "../../../configs";
import { useFacebookAuth, useGoogleAuth } from "../../../hooks";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useLocalSignUpMutation } from "../../../services";

export interface SignUpScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "sign-up-screen">, StackNavigationProp<RootStackParamList>>;
}

export const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { Colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const intl = useIntl(); // Access the intl object
  const termsOfServiceUrl = `${shortwaitsApi.baseUrl}/shortwaits/terms-of-use`;
  const { isLoading: isGoogleAuthLoading, error: googleAuthError, handleGoogleAuth } = useGoogleAuth();
  const { isLoading: isFacebookAuthLoading, error: facebookAuthError, handleFacebookAuth } = useFacebookAuth();
  const [localSignUp, localSignUpStatus] = useLocalSignUpMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text preset="headerTitle" text={intl.formatMessage({ id: "Sign_Up_With_Email_Screen.headerTitle" })} />,
    });
  }, [intl, navigation]);

  const initialValues = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  useEffect(() => {
    const error = googleAuthError || localSignUpStatus.error || facebookAuthError;
    if (error) {
      console.log("error >>> ", error);

      Alert.alert(
        intl.formatMessage({
          id: "Common.error.title",
        }),
        error ||
          intl.formatMessage({
            id: "Common.error.message",
          })
      );
    }
  }, [googleAuthError, localSignUpStatus.error, intl, facebookAuthError]);

  const handlePasswordVisibility = useCallback(() => {
    setIsVisible(visibility => !visibility);
  }, []);

  const { touched, errors, values, handleChange, handleSubmit, dirty, isValid } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        console.log("formData >>> ", formData);
        localSignUp({
          username: formData.username,
          email: formData.email,
          password: formData.passwordConfirmation,
        });
      },
    },
    "adminAppLocalSignUp"
  );

  if (localSignUpStatus.isLoading || isGoogleAuthLoading || isFacebookAuthLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Screen preset="scroll" withHorizontalPadding unsafe>
      <Space />
      {/* <Welcome2 height={getResponsiveHeight(120)} width={getResponsiveHeight(120)} /> */}
      <TextFieldCard
        keyboardType="default"
        autoCapitalize="none"
        title={intl.formatMessage({ id: "Sign_Up_With_Email_Screen.userNameOrEmail" })}
        placeholder={intl.formatMessage({ id: "Sign_Up_With_Email_Screen.userNameOrEmail.placeholder" })}
        value={values.email}
        onChangeText={handleChange("email")}
        isTouched={touched.email}
        errors={errors.email}
      />
      <Space size="small" />
      <TextFieldCard
        secureTextEntry={!isVisible}
        title={intl.formatMessage({ id: "Sign_Up_With_Email_Screen.password" })}
        placeholder=""
        value={values.password}
        rightIconOnPress={handlePasswordVisibility}
        rightIconName={isVisible ? "eye" : "eye-off"}
        rightIconColor={isVisible ? Colors.disabledText : Colors.brandPrimary}
        onChangeText={handleChange("password")}
        isTouched={touched.password}
        errors={errors.password}
      />
      <Space size="small" />
      <TextFieldCard
        secureTextEntry={!isVisible}
        title={intl.formatMessage({ id: "Sign_Up_With_Email_Screen.confirmPassword" })}
        placeholder=""
        value={values.passwordConfirmation}
        onChangeText={handleChange("passwordConfirmation")}
        isTouched={touched.passwordConfirmation}
        errors={errors.passwordConfirmation}
      />
      <Space />
      <Button onPress={() => handleSubmit()} text={intl.formatMessage({ id: "Common.signUp" })} />
      <Space />
      <View style={styles.signInRow}>
        <Text
          preset="textLarge"
          style={{ color: Colors.text }}
          text={intl.formatMessage({
            id: "Sign_Up_With_Email_Screen.alreadyHaveAnAccount",
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
          text={intl.formatMessage({ id: "Common.signIn" })}
          onPress={() => {
            navigation.navigate("unauthorized", { screen: "sign-in-screen" });
          }}
        />
      </View>
      <Container
        style={{
          marginTop: "auto",
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
      <Button
        style={{
          width: "100%",
          justifyContent: "center",
        }}
        preset="social"
        onPress={handleFacebookAuth}
      >
        <Facebook width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
        <Container style={styles.buttonContainer}>
          <Text preset="social">{intl.formatMessage({ id: "Sign_Up_Screen.facebook" })}</Text>
        </Container>
      </Button>
      <Space size="small" />
      <Button
        style={{
          width: "100%",
          justifyContent: "center",
        }}
        preset="social"
        onPress={handleGoogleAuth}
      >
        <Google width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
        <Container style={styles.buttonContainer}>
          <Text preset="social">{intl.formatMessage({ id: "Sign_Up_Screen.google" })}</Text>
        </Container>
      </Button>
      <Space size="small" />
      <Space />
      <TermsAndConditions
        onPress={() => {
          navigation.navigate("modals", {
            screen: "webview-modal-screen",
            params: {
              uri: termsOfServiceUrl,
              header: "Terms and Conditions",
            },
          });
        }}
      />
      <Space />
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
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  signInRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
