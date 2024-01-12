import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { hidePremiumMembershipBanner } from "../../store";
import { useTheme } from "../../theme";
import { navigate } from "../../utils";
import { Button, Container, Text } from "../common";
import image from "./background_1.png";

export function PremiumMembershipBanner() {
  const insets = useSafeAreaInsets();
  const { Colors } = useTheme();
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
      <View
        style={{
          width: "100%",
          paddingHorizontal: 16,
        }}
      >
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
            onPress={() =>
              navigate("authorized-stack", {
                screen: "plans-screen",
              })
            }
            style={[
              styles.button,
              {
                backgroundColor: "rgba(0,0,0,0.7)",
                //backgroundColor: Colors.brandPrimary
              },
            ]}
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
    alignSelf: "center",
    textAlign: "center",
  },
  subTitle: {
    marginTop: 4,
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    alignSelf: "center",
    textAlign: "center",
  },
  button: {
    height: 32,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    marginHorizontal: 28,
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
