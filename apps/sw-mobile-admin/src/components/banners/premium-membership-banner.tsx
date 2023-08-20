import React from "react";
import { View, StyleSheet, ImageBackground, StatusBar, Platform } from "react-native";
import { Button, Container, Text } from "../common";
import image from "./background_1.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { hidePremiumMembershipBanner } from "../../store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function PremiumMembershipBanner() {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hidePremiumMembershipBanner());
  };
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={[
        styles.container,
        {
          ...Platform.select({
            ios: {
              alignItems: "center",
              // minHeight: 200,
              justifyContent: "flex-end",
              paddingBottom: 8,
            },
            android: {
              justifyContent: "center",
              minHeight: 170,
            },
          }),
        },
      ]}
      imageStyle={styles.image}
    >
      {/* <View
        style={{
          position: "absolute",

          backgroundColor: "rgba(0,0,0,0.8)",
          width: 30,
          height: 30,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          ...Platform.select({
            ios: {
              top: 46,
              right: 36,
            },
            android: {
              top: 26,
              right: 26,
            },
          }),
        }}
      >
        <Icon name="close" color="white" size={24}  />
      </View> */}
      <StatusBar barStyle="light-content" hidden backgroundColor={"rgba(0,0,0,0.8)"} />
      <View
        style={{
          marginTop: insets.top,
        }}
      >
        <Text preset="text" style={styles.title}>
          <Text preset="text" style={[styles.title, { color: "white" }]}>
            {"love "}
          </Text>
          {"Shortwaits\nPremium"}
        </Text>
        <Text preset="text" style={styles.subTitle}>
          {"3 months for only $0.99!"}
        </Text>
        <Container
          direction="row"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button preset="none" style={styles.button} textStyle={styles.buttonText} text="JOIN NOW" />
          <Button
            preset="link"
            textStyle={{
              fontSize: 14,
              color: "#3B2C09",
              fontWeight: "700",
              textTransform: "uppercase",
              marginLeft: 16,
            }}
            text="cancel"
            onPress={handleClose}
          />
        </Container>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: 180,
  },
  image: {
    minHeight: 180,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    color: "#170F02",
  },
  subTitle: {
    marginTop: 4,
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "pink",
    height: 32,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "rgba(0,0,0,0.87)",
    marginHorizontal: 28,
    fontSize: 14,
    fontWeight: "700",
  },
});
