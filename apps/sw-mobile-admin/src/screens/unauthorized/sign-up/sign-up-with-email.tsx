import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { useIntl } from "react-intl";

import { Button, Space, Text, TextFieldCard, Screen } from "../../../components";
import { useForm } from "../../../hooks";
import { useTheme } from "../../../theme";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useLocalSignUpMutation } from "../../../services";

interface SignUpWithEmailScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "sign-up-with-email-screen">, StackNavigationProp<RootStackParamList>>;
}

export const SignUpWithEmail: FC<SignUpWithEmailScreenProps> = ({ navigation }) => {
  const intl = useIntl(); // Access the intl object

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text preset="headerTitle" text={intl.formatMessage({ id: "Sign_Up_With_Email_Screen.headerTitle" })} />,
    });
  }, [intl, navigation]);

  const { Colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [localSignUp, { isLoading }] = useLocalSignUpMutation();
  const initialValues = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  };
  const { touched, errors, values, handleChange, handleSubmit, dirty } = useForm(
    {
      initialValues,
      onSubmit: formData => {
        localSignUp({
          username: formData.username,
          email: formData.email,
          password: formData.passwordConfirmation,
        });
      },
    },
    "userLocalSignUp"
  );

  const handlePasswordVisibility = useCallback(() => {
    setIsVisible(visibility => !visibility);
  }, []);

  return (
    <Screen preset="scroll" withHorizontalPadding>
      <Space />
      <TextFieldCard
        keyboardType="default"
        autoCapitalize="none"
        title={intl.formatMessage({ id: "Sign_Up_With_Email_Screen.userNameOrEmail" })}
        placeholder={intl.formatMessage({ id: "Sign_Up_With_Email_Screen.userNameOrEmail.placeholder" })}
        value={values.username}
        onChangeText={handleChange("username")}
        isTouched={touched.username}
        errors={errors.username}
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
      <Button onPress={() => handleSubmit()} preset="primary" text={intl.formatMessage({ id: "Common.signUp" })} state={!dirty ? "disabled" : isLoading ? "loading" : "enabled"} />
      <Space />
      <View style={styles.signInRow}>
        <Text
          preset="subLink"
          style={{ color: Colors.text }}
          text={intl.formatMessage({
            id: "Sign_Up_With_Email_Screen.alreadyHaveAnAccount",
          })}
        />
        <Button
          preset="link"
          text={intl.formatMessage({ id: "Common.signIn" })}
          onPress={() => {
            navigation.navigate("unauthorized", { screen: "sign-in-screen" });
          }}
        />
      </View>
      <Space size="xLarge" />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  signInRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subLink: {
    fontWeight: "bold",
  },
});
