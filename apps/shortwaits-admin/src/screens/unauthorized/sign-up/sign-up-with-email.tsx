import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";

import {
  Button,
  Space,
  Text,
  TextFieldCard,
  ScrollView,
} from "@shortwaits/admin/components";
import { useForm } from "@shortwaits/admin/hooks/useForm";
import { useTheme } from "@shortwaits/admin/theme";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "@shortwaits/admin/navigation/navigation-types";
import { useLocalSignUpMutation } from "@shortwaits/admin/services/api";

interface SignUpWithEmailScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<
      UnauthorizedStackParamList,
      "sign-up-with-email-screen"
    >,
    StackNavigationProp<RootStackParamList>
  >;
}

export const SignUpWithEmail: FC<SignUpWithEmailScreenProps> = ({
  navigation,
}) => {
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
    password: "",
    passwordConfirmation: "",
  };
  const { touched, errors, values, handleChange, handleSubmit, dirty } =
    useForm(
      {
        initialValues,
        onSubmit: (formData) => {
          localSignUp({
            username: formData.email,
            email: formData.email,
            password: formData.passwordConfirmation,
          });
        },
      },
      "signUpSchema"
    );

  const handlePasswordVisibility = useCallback(() => {
    setIsVisible((visibility) => !visibility);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.background,
        },
      ]}
    >
      <Space />
      <ScrollView>
        <TextFieldCard
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
          title="Email"
          placeholder="bod_ross@shortwaits.com"
          value={values.email}
          onChangeText={handleChange("email")}
          isTouched={touched.email}
          errors={errors.email}
        />
        <Space />
        <TextFieldCard
          secureTextEntry={!isVisible}
          autoCompleteType="password"
          title="Password"
          placeholder=""
          value={values.password}
          rightIconSize={"regular"}
          rightIconOnPress={handlePasswordVisibility}
          rightIconName={isVisible ? "eye" : "eye-off"}
          rightIconColor={isVisible ? Colors.brandPrimary : Colors.lightGray}
          onChangeText={handleChange("password")}
          isTouched={touched.password}
          errors={errors.password}
        />
        <Space />
        <TextFieldCard
          secureTextEntry={!isVisible}
          autoCompleteType="password"
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
        onPress={handleSubmit}
        preset="primary"
        text="Submit"
        state={!dirty ? "disabled" : isLoading ? "loading" : "enabled"}
      />
      <Space />
      <View style={styles.signInRow}>
        <Text
          preset="subLink"
          style={{ color: Colors.text }}
          text="Already have an account?    "
        />
        <Button
          preset="subLink"
          text="Sign in"
          onPress={() => {
            navigation.navigate("unauthorized", { screen: "sign-in-screen" });
          }}
        />
      </View>
      <Space size="xLarge" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  signInRow: {
    flexDirection: "row",
  },
  subLink: {
    fontWeight: "bold",
  },
});
