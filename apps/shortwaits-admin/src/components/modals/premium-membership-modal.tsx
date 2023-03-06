import { Portal } from "@gorhom/portal";
import React, { FC } from "react";
import { View } from "react-native";
import { Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { hidePremiumMembershipModal } from "../../redux";
import { useTheme } from "../../theme";
import { Button, Container, Space, Text } from "../common";

interface PremiumMembershipModalPropTypes {
  visible: boolean;
  onDismiss(): void;
}

const premiumAccountFeatures = [
  { name: "", description: "Text(SMS) Reminders" },
  { name: "", description: "Google Calendar Support" },
  { name: "", description: "Accept payments with Stripe" },
  { name: "", description: "Zoom & Google Meet support" },
  { name: "", description: "Recurring Appointments" },
  { name: "", description: "Multiple users support" },
];
const CheckedList = ({ text }) => {
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Icon size={27} name="check" />
        <Space direction="vertical" />
        <Text>{text}</Text>
      </View>
      <Space size="tiny" />
    </>
  );
};

export const PremiumMembershipModal: FC<PremiumMembershipModalPropTypes> = (
  props
) => {
  const { onDismiss, visible } = props;
  const { Colors } = useTheme();
  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} dismissable={false}>
        <View
          style={{
            backgroundColor: Colors.backgroundOverlay,
            width: "90%",
            alignSelf: "center",
            // minHeight: "60%",
            justifyContent: "flex-start",
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          <Space />
          <Text preset="title2" style={{ fontWeight: "bold" }}>
            Shortwaits Premium
          </Text>
          <Space size="small" />
          <Container direction="row">
            <Text preset="title2">{"$4.99/"}</Text>
            <Text preset="title3">{"month"}</Text>
          </Container>
          <Space size="small" />
          <View>
            {premiumAccountFeatures.map((elem, index) => {
              return (
                <CheckedList key={elem.name + index} text={elem.description} />
              );
            })}
          </View>
          <Space />
          <Button
            style={{ backgroundColor: Colors.brandPrimary, marginTop: "auto" }}
            textStyle={{
              fontSize: 20,
              color: Colors.white,
              fontWeight: "bold",
            }}
            text="GET PREMIUM"
          />
          <Space />
          <Button
            onPress={() => {
              dispatch(hidePremiumMembershipModal());
            }}
            textStyle={{ color: Colors.brandSecondary7 }}
            preset="subLink"
            text="CONTINUE FREE"
          />
          <Text preset="link">Terms and Conditions</Text>
        </View>
      </Modal>
    </Portal>
  );
};
