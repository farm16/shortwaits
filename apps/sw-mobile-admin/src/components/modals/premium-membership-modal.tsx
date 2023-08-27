import { Portal } from "@gorhom/portal";
import React, { FC } from "react";
import { View } from "react-native";
import { Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { hidePremiumMembershipModal, useGhostComponent } from "../../store";
import { useTheme } from "../../theme";
import { Button, Container, Space, Text } from "../common";
import { getResponsiveFontSize, navigate } from "../../utils";

const premiumAccountFeatures = [
  { name: "", description: "Text(SMS) Reminders" },
  { name: "", description: "Google Calendar Support" },
  { name: "", description: "Accept payments with Stripe" },
  { name: "", description: "Zoom & Google Meet support" },
  { name: "", description: "Recurring Appointments" },
  { name: "", description: "Multiple users support" },
];
const CheckedList = ({ text }) => {
  const { Colors } = useTheme();

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Icon size={27} name="check" color={Colors.brandSecondary} />
        <Space direction="vertical" />
        <Text
          style={{
            fontSize: getResponsiveFontSize(16),
            color: Colors.text,
          }}
        >
          {text}
        </Text>
      </View>
      <Space size="tiny" />
    </>
  );
};

export const PremiumMembershipModal = props => {
  const { isVisible } = useGhostComponent("premiumMembership");

  const { Colors } = useTheme();
  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal visible={isVisible} dismissable={true}>
        <View
          style={{
            backgroundColor: Colors.backgroundOverlay,
            marginHorizontal: 16,
            alignItems: "center",
            paddingHorizontal: 16,
            borderRadius: 16,
          }}
        >
          <Space />
          <Text preset="title2" style={{ fontWeight: "bold", textAlign: "center" }}>
            {"Shortwaits\nPremium"}
          </Text>
          <Space size="small" />
          <Container direction="row" justifyContent="center" alignItems="flex-end">
            <Text preset="title2">{"$1.50/"}</Text>
            <Text preset="title3">{"month"}</Text>
          </Container>
          <Space size="small" />
          <View>
            {premiumAccountFeatures.map((elem, index) => {
              return <CheckedList key={elem.name + index} text={elem.description} />;
            })}
          </View>
          <Space />
          <Button
            onPress={() => {
              dispatch(hidePremiumMembershipModal());
              navigate("authorized-stack", { screen: "plans-screen" });
            }}
            text="GET PREMIUM"
          />
          <Space size="small" />
          <Button
            onPress={() => {
              dispatch(hidePremiumMembershipModal());
            }}
            textStyle={{ color: Colors.brandSecondary7 }}
            preset="subLink"
            text="CONTINUE FREE"
          />
          <Button
            preset="link"
            textStyle={{
              fontSize: getResponsiveFontSize(14),
              color: Colors.brandSecondary,
            }}
            text="Terms and Conditions"
          />
          <Space />
        </View>
      </Modal>
    </Portal>
  );
};
