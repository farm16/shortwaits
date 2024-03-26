import { BackButton, Button, Checkbox, Container, Facebook, Google, Logo2, Screen, Space, Text, TextFieldCard, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, StyleSheet, View } from "react-native";
import { useDefaultHeaderHeight, useForm } from "../../../hooks";
import { UnauthorizedScreenProps } from "../../../navigation";
import { useLocalSignUpMutation, useSocialSignUpMutation } from "../../../services";

export function SignUpScreen({ navigation }: UnauthorizedScreenProps<"sign-up-screen">) {
  const { Colors } = useTheme();
  const intl = useIntl(); // Access the intl object
  const [isVisible, setIsVisible] = useState(false);

  const [socialSignUp, { isLoading }] = useSocialSignUpMutation();
  const [localSignUp, { isLoading: isLocalSignUpLoading }] = useLocalSignUpMutation();

  const handleGoogleSignUp = useCallback(async () => {
    try {
      // const authCode = await onGoogleButtonPress();
      // await socialSignUp({
      //   provider: 'google',
      //   authCode,
      // });
    } catch (error) {
      Alert.alert("Oops", "Something went wrong. Please try again.");
      console.log("Error during Google sign-up:", error);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
    });
  }, [navigation]);

  const handleFacebookSignUp = useCallback(async () => {
    try {
      // const authCode = await onGoogleButtonPress();
      // await socialSignUp({
      //   provider: 'google',
      //   authCode,
      // });
    } catch (error) {
      Alert.alert("Oops", "Something went wrong. Please try again.");
      console.log("Error during Google sign-up:", error);
    }
  }, []);

  const renderButton = useCallback(() => {
    return <BackButton onPress={() => navigation.goBack()} />;
  }, [navigation]);

  const initialValues = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  };
  const { touched, errors, values, handleChange, handleSubmit, dirty } = useForm<"adminAppLocalSignUp">(
    {
      initialValues,
      onSubmit: formData => {
        localSignUp({
          email: formData.email,
          password: formData.passwordConfirmation,
        });
      },
    },
    "adminAppLocalSignUp"
  );
  const handlePasswordVisibility = useCallback(() => {
    setIsVisible(visibility => !visibility);
  }, []);
  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }
  const headerHeight = useDefaultHeaderHeight();

  return (
    <Screen preset="fixed" withHorizontalPadding>
      {/* <Space customSize={0} extra={headerHeight} /> */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo2 width={getResponsiveHeight(100)} height={getResponsiveHeight(100)} />
      </View>
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
      <Space size="small" />
      <Container direction="row" alignItems="center">
        <Checkbox
          value={true}
          onPress={value => {
            console.log(value);
          }}
        />
        <Space size="tiny" direction="vertical" />
        <Text preset="text" text="I agree to the " />
        <Button preset="none">
          <Text
            preset="link"
            style={{
              color: Colors.brandAccent,
            }}
            text="Terms of Service"
          />
        </Button>
      </Container>
      <Space />
      <Button preset="primary" onPress={() => handleSubmit()} text="Submit" />
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

      <Container direction="row" alignItems="center" justifyContent="center">
        <Button preset="social">
          <Facebook width={30} height={30} />
        </Button>
        <Space direction="vertical" />
        <Button preset="social" onPress={handleGoogleSignUp}>
          <Google width={30} height={30} />
        </Button>
      </Container>
      <Space />
      <View style={styles.footer}>
        <Text
          preset="text"
          text={intl.formatMessage({
            id: "Sign_Up_With_Email_Screen.alreadyHaveAnAccount",
          })}
        />
        <Button
          preset="link"
          text={intl.formatMessage({
            id: "Common.signIn",
          })}
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-in-screen",
            })
          }
        />
      </View>
      <Space />
    </Screen>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "auto",
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
