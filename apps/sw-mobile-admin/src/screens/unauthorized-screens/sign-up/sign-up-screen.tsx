import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Container, Email, Facebook, Google, Screen, Space, TermsAndConditions, Text, Welcome2, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React, { FC } from "react";
import { useIntl } from "react-intl";
import { Alert, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { shortwaitsApi } from "../../../configs";
import { useGoogleAuth } from "../../../hooks";
import { RootStackParamList, UnauthorizedStackParamList } from "../../../navigation";

export interface SignUpScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<UnauthorizedStackParamList, "sign-up-screen">, StackNavigationProp<RootStackParamList>>;
}

export const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { Colors } = useTheme();
  const intl = useIntl(); // Access the intl object
  const termsOfServiceUrl = `${shortwaitsApi.baseUrl}/shortwaits/terms-of-use`;

  const { isLoading, error, handleGoogleAuth } = useGoogleAuth();

  if (error) {
    Alert.alert(
      intl.formatMessage({
        id: "Common.error.title",
      }),
      intl.formatMessage({
        id: "Common.error.message",
      })
    );
  }

  if (isLoading) return <ActivityIndicator />;

  return (
    <Screen preset="fixed" withHorizontalPadding>
      <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 100, flex: 1 }}>
        <Welcome2 height={getResponsiveHeight(200)} width={getResponsiveHeight(200)} />
        <Text
          style={{
            color: Colors.subText,
            textTransform: "uppercase",
            fontWeight: "500",
            marginTop: 21,
            alignSelf: "center",
          }}
          text={intl.formatMessage({ id: "Sign_Up_Screen.title" })}
        />
      </View>
      <View style={styles.formContainer}>
        <Button
          style={{
            width: "100%",
            justifyContent: "center",
          }}
          preset="social"
          onPress={handleGoogleAuth}
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
        <Button
          preset="social"
          style={{
            width: "100%",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("unauthorized", {
              screen: "sign-up-with-email-screen",
            })
          }
        >
          <Email width={30} height={30} style={{ position: "absolute", left: 0, margin: 16 }} />
          <Container style={styles.buttonContainer}>
            <Text preset="social">{intl.formatMessage({ id: "Sign_Up_Screen.email" })}</Text>
          </Container>
        </Button>
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
});
