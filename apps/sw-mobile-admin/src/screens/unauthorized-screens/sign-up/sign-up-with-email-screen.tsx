import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, Button, Screen, Space, Text, TextFieldCard, useForm, useTheme } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { StyleSheet, View } from "react-native";
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
  console.log("errors >>> ", errors);

  const handlePasswordVisibility = useCallback(() => {
    setIsVisible(visibility => !visibility);
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Screen preset="scroll" withHorizontalPadding unsafe>
      <Space />
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
    justifyContent: "flex-end",
  },
  subLink: {
    fontWeight: "bold",
  },
});
