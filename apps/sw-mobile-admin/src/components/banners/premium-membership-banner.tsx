import React, { useCallback } from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity, Platform } from "react-native";
import { Button, Container, Text } from "../common";
import image from "./background_1.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { hidePremiumMembershipBanner } from "../../store";
import { navigate } from "../../utils";
import { useIntl } from "react-intl";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function PremiumMembershipBanner() {
  const insets = useSafeAreaInsets();
  const intl = useIntl();

  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(hidePremiumMembershipBanner());
  }, [dispatch]);

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={[
        styles.container,
        {
          ...Platform.select({
            ios: {
              paddingTop: insets.top,
              marginBottom: -insets.top,
              zIndex: 10,
            },
            android: {
              paddingTop: 16,
            },
          }),
        },
      ]}
      imageStyle={styles.image}
    >
      <View>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            right: -30,
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 25 / 2,
            height: 25,
            width: 25,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
          onPress={handleClose}
        >
          <Icon name="close" size={20} color="white" onPress={handleClose} />
        </TouchableOpacity>
        <Text preset="text" style={styles.title}>
          {intl.formatMessage({ id: "Banner.premiumMembership.text1" })}
          {intl.formatMessage({ id: "Banner.premiumMembership.text2" })}
        </Text>
        <Text preset="text" style={styles.subTitle}>
          {intl.formatMessage({ id: "Banner.premiumMembership.text3" })}
        </Text>
        <Container
          direction="row"
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Button
            preset="none"
            onPress={() => navigate("authorized-stack", { screen: "plans-screen" })}
            style={styles.button}
            textStyle={styles.buttonText}
            text={intl.formatMessage({ id: "Banner.premiumMembership.joinButton" })}
          />
        </Container>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    // height: getResponsiveHeight(80),
  },
  image: {
    // minHeight: 180,
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
    textTransform: "uppercase",
  },
});
