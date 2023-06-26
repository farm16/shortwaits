import React from "react";
import { View, StyleSheet, ImageBackground, StatusBar } from "react-native";
import { Button, Text } from "../common";
import image from "./background_1.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { hidePremiumMembershipBanner } from "../../redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function PremiumMembershipBanner() {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hidePremiumMembershipBanner());
  };
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.image}
    >
      <View
        style={{
          position: "absolute",
          right: 16,
          top: statusBarHeight - 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          width: 30,
          height: 30,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="close" color="white" size={24} onPress={handleClose} />
      </View>
      <StatusBar barStyle="light-content" />
      <View style={{ marginTop: statusBarHeight }}>
        <Text preset="text" style={styles.title}>
          <Text preset="text" style={[styles.title, { color: "white" }]}>
            {"love "}
          </Text>
          {"Shortwaits\nPremium"}
        </Text>
        <Text preset="text" style={styles.subTitle}>
          {"3 months for only $0.99!"}
        </Text>
        <Button
          preset="none"
          style={styles.button}
          textStyle={styles.buttonText}
          text="JOIN NOW"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 180,
  },
  image: {
    height: 180,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
  },
  subTitle: {
    marginTop: 4,
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: "pink",
    height: 32,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "rgba(0,0,0,0.87)",
    marginHorizontal: 28,
    fontSize: 14,
    fontWeight: "700",
  },
});
