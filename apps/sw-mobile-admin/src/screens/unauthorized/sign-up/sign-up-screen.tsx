import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";

import { Screen, Button, Text, Space, Container } from "../../../components";
import Facebook from "../../../assets/icons/facebook.svg";
import Google from "../../../assets/icons/google.svg";
import EMail from "../../../assets/icons/email.svg";
import {
  RootStackParamList,
  UnauthorizedStackParamList,
} from "../../../navigation";
import { useTheme } from "../../../theme";

export interface SignUpScreenProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<UnauthorizedStackParamList, "sign-up-screen">,
    StackNavigationProp<RootStackParamList>
  >;
}

export const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
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
          style={{
            color: Colors.subText,
            textTransform: "uppercase",
            fontWeight: "500",
            marginTop: 21,
            alignSelf: "center",
          }}
          text="create account"
        />
      </View>

      <View style={styles.formContainer}>
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
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-up-with-email-screen",
            })
          }
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
        <View style={styles.footerContainer}>
          <Button preset="subLink" onPress={() => {}}>
            <Text text="T" preset="subLink" />
            <Text text="&" preset="subLink" />
            <Text text="C" preset="subLink" />
          </Button>
        </View>
        <Space size="xLarge" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
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
});
