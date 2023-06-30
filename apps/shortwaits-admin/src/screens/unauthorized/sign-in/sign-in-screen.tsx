import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { CompositeNavigationProp } from "@react-navigation/native";
import {
  Screen,
  Logo,
  Button,
  Text,
  Space,
  Container,
} from "../../../components";
import Facebook from "../../../assets/icons/facebook.svg";
import Google from "../../../assets/icons/google.svg";
import EMail from "../../../assets/icons/email.svg";
import { useTheme } from "../../../theme";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "../../../navigation/navigation-types";

export interface RegisterWithEmailScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "sign-in-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export const SignInScreen: FC<RegisterWithEmailScreenProps> = ({
  navigation,
}) => {
  const { Colors } = useTheme();

  return (
    <Screen preset="fixed">
      <View style={{ justifyContent: "center", marginBottom: 100, flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 37,
            lineHeight: 37,
            fontStyle: "italic",
            fontWeight: "bold",
            alignSelf: "center",
            color: Colors.brandSecondary,
          }}
        >
          SHORT{"\n"}WAITS
        </Text>
        <Text
          text="Login"
          style={{
            color: Colors.subText,
            textTransform: "uppercase",
            fontWeight: "500",
            marginTop: 21,
            alignSelf: "center",
          }}
        />
      </View>
      <View style={styles.container}>
        <Button preset="social">
          <Container style={styles.buttonContainer}>
            <Facebook width={30} height={30} />
            <Space direction="vertical" size="tiny" />
            <Text preset="social">with Facebook</Text>
          </Container>
        </Button>
        <Space size="small" />
        <Button preset="social">
          <Container style={styles.buttonContainer}>
            <Google width={30} height={30} />
            <Space direction="vertical" size="tiny" />
            <Text preset="social">with Gmail</Text>
          </Container>
        </Button>
        <Space size="small" />
        <Button
          preset="social"
          style={{ backgroundColor: Colors.brandSecondary3 }}
          onPress={() => {
            navigation.navigate("unauthorized", {
              screen: "sign-in-with-email-screen",
            });
          }}
        >
          <Container style={styles.buttonContainer}>
            <EMail width={30} height={30} />
            <Space direction="vertical" size="tiny" />
            <Text style={{ color: "white" }} preset="social">
              with Email
            </Text>
          </Container>
        </Button>
        <Space size="large" />
        <View style={styles.footer}>
          <Text
            preset="subLink"
            style={{ color: Colors.text }}
            text="Don't have an account?   "
          />
          <Button
            preset="subLink"
            textStyle={{ color: Colors.brandSecondary6 }}
            text="Sign up"
            onPress={() => {
              navigation.navigate("unauthorized", { screen: "sign-up-screen" });
            }}
          />
        </View>
        <Space size="xLarge" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
