import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";

import { Button, Space, Text, TextFieldCard, ScrollView, Screen } from "../../../components";
import { useForm } from "../../../hooks";
import { useTheme } from "../../../theme";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";
import { useLocalSignUpMutation } from "../../../services";

interface SignUpWithEmailScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "sign-up-with-email-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export const SignUpWithEmail: FC<SignUpWithEmailScreenProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create new account",
    });
  }, [navigation]);

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
    <Screen preset="fixed" withHorizontalPadding>
      <Space />
      <ScrollView>
        <TextFieldCard
          keyboardType="default"
          autoCapitalize="none"
          title="Email or username"
          placeholder="bod_ross123"
          value={values.username}
          onChangeText={handleChange("username")}
          isTouched={touched.username}
          errors={errors.username}
        />
        <Space size="small" />
        <TextFieldCard
          secureTextEntry={!isVisible}
          title="Password"
          placeholder=""
          value={values.password}
          rightIconOnPress={handlePasswordVisibility}
          rightIconName={isVisible ? "eye" : "eye-off"}
          rightIconColor={isVisible ? Colors.disabledText : Colors.brandSecondary}
          onChangeText={handleChange("password")}
          isTouched={touched.password}
          errors={errors.password}
        />
        <Space size="small" />
        <TextFieldCard
          secureTextEntry={!isVisible}
          title="Confirm password"
          placeholder=""
          value={values.passwordConfirmation}
          onChangeText={handleChange("passwordConfirmation")}
          isTouched={touched.passwordConfirmation}
          errors={errors.passwordConfirmation}
        />
      </ScrollView>
      <Space />
      <Button
        onPress={() => handleSubmit()}
        preset="primary"
        text="Submit"
        state={!dirty ? "disabled" : isLoading ? "loading" : "enabled"}
      />
      <Space />
      <View style={styles.signInRow}>
        <Text preset="subLink" style={{ color: Colors.text }} text="Already have an account?    " />
        <Button
          preset="subLink"
          text="Sign in"
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
