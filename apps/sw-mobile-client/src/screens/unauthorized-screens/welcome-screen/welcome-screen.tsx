import { Button, LogoWhite, Screen, Space, Text, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UnauthorizedScreenProps } from "../../../navigation";

export function WelcomeScreen({ navigation }: UnauthorizedScreenProps<"welcome-screen">) {
  const { Colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Screen preset="fixed" backgroundColor={"brandSecondary"} statusBar="light-content" unsafe unsafeBottom>
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2015/08/10/09/42/architecture-882564_1280.jpg",
        }}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.logo}>
          <Space />
          <LogoWhite width={getResponsiveHeight(100)} height={getResponsiveHeight(100)} />
        </View>
        <View style={styles.button}>
          <Button
            text="Get Started"
            onPress={() => {
              navigation.navigate("unauthorized", { screen: "sign-up-screen" });
            }}
          />
          <Space />
          <View style={styles.link}>
            <Text
              style={{
                color: Colors.white,
              }}
              preset="link"
              text="Already a member?"
            />
            <Button
              textStyle={{
                color: Colors.brandAccent,
              }}
              onPress={() => {
                navigation.navigate("unauthorized", { screen: "sign-in-screen" });
              }}
              preset="link"
              text="Login"
            />
          </View>
          <Space />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  logo: {
    alignSelf: "center",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust the opacity and color as needed
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
