import { Portal } from "@gorhom/portal";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { hidePremiumMembershipModal, selectCurrentMobileAdminState } from "../../store";
import { useTheme } from "../../theme";
import { getFontSize, navigate } from "../../utils";
import { Button, Container, Space, Text } from "../common";

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
            fontSize: getFontSize(16),
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
  const dispatch = useDispatch();
  const mobileAdmin = useSelector(selectCurrentMobileAdminState);
  const handleDismiss = useCallback(() => {
    dispatch(hidePremiumMembershipModal());
  }, [dispatch]);

  const isVisible = mobileAdmin?.components.premiumMembership.isVisible ?? false;
  const { Colors } = useTheme();

  if (!isVisible) {
    return null;
  }

  return (
    <Portal>
      <Modal visible={true} dismissable={true} onDismiss={handleDismiss}>
        <View
          style={{
            backgroundColor: Colors.lightBackground,
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
              handleDismiss();
              navigate("authorized-stack", { screen: "plans-screen" });
            }}
            text="GET PREMIUM"
          />
          <Space size="small" />
          <Button
            onPress={() => {
              handleDismiss();
            }}
            textStyle={{ color: Colors.brandSecondary7 }}
            preset="subLink"
            text="CONTINUE FREE"
          />
          <Button
            preset="link"
            textStyle={{
              fontSize: getFontSize(14),
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
