import React, { FC, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import {
  Button,
  Text,
  Checkbox,
  Space,
  TextFieldCard,
  Screen,
} from "../../../components";
import { useTheme } from "../../../theme";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "../../../navigation";
import { useForm } from "../../../hooks";
import { useLocalSignInMutation } from "../../../services";
interface SignInWithEmailScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<
      UnauthorizedStackParamList,
      "sign-in-with-email-screen"
    >,
    StackNavigationProp<RootStackParamList>
  >;
}

export const SignInWithEmail: FC<SignInWithEmailScreenProps> = ({
  navigation,
}) => {
  const { Colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const [localSignIn, response] = useLocalSignInMutation();

  console.log("response >>>", response);

  const initialValues = {
    email: "",
    password: "",
  };
  const { touched, errors, values, handleChange, handleSubmit, dirty } =
    useForm(
      {
        initialValues,
        onSubmit: formData => {
          localSignIn({
            email: formData.email,
            password: formData.password,
          });
        },
      },
      "signInSchema"
    );
  const handlePasswordVisibility = useCallback(() => {
    setIsVisible(visibility => !visibility);
  }, []);

  return (
    <Screen preset="fixed" style={{ alignItems: "center" }}>
      <Space />
      <ScrollView>
        <TextFieldCard
          autoCapitalize="none"
          keyboardType="email-address"
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
          title="Password"
          placeholder=""
          value={values.password}
          rightIconSize={"regular"}
          rightIconOnPress={handlePasswordVisibility}
          rightIconName={isVisible ? "eye-off" : "eye"}
          rightIconColor={
            isVisible ? Colors.disabledText : Colors.brandSecondary
          }
          onChangeText={handleChange("password")}
          isTouched={touched.password}
          errors={errors.password}
        />
        <Space />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <Checkbox />
          <Text
            preset="subLink"
            style={{ color: Colors.text, marginLeft: 5 }}
            text="Stay signed in"
          />
          <Button
            style={{ marginLeft: "auto" }}
            preset="subLink"
            text="Forgot password?"
          />
        </View>
        <View>
          <Text
            preset="error"
            text={
              response.isError
                ? "* " + (response?.error?.data?.message ?? "unknown error")
                : ""
            }
          />
        </View>
        <Space />
        <Button
          disabled={response.isLoading}
          onPress={() => handleSubmit()}
          preset="primary"
          text="Sign In"
        />
        <Space />
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text
            preset="subLink"
            style={{ color: Colors.text }}
            text="Need an account? "
          />
          <Button
            preset="subLink"
            text="Sign Up"
            onPress={() => {
              navigation.navigate("unauthorized", { screen: "sign-up-screen" });
            }}
          />
        </View>
        <Space size="xLarge" />
      </ScrollView>
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
  },
  subLink: {
    fontWeight: "bold",
  },
});
