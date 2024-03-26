import { Portal } from "@gorhom/portal";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../theme";
import { getResponsiveFontSize } from "../../utils";
import { Button, Container, Space, Text } from "../common";

const premiumAccountFeatures = [
  { name: "", description: "Text(SMS) Reminders" },
  { name: "", description: "Google Calendar Support" },
  { name: "", description: "Accept payments with Stripe" },
  { name: "", description: "Zoom & Google Meet support" },
  { name: "", description: "Recurring Appointments" },
  { name: "", description: "Multiple users support" },
];
const CheckedList = ({ text }: { text: string }) => {
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

type PremiumMembershipModalProps = {
  onPress?(): void;
  onDismiss?(): void;
  isVisible?: boolean;
};

export const PremiumMembershipModal = (props: PremiumMembershipModalProps) => {
  const handleDismiss = useCallback(() => {
    if (props.onDismiss) {
      props.onDismiss();
    }
  }, [props]);

  const handleOnPress = useCallback(() => {
    if (props.onPress) {
      props.onPress();
    }
  }, [props]);

  const { Colors } = useTheme();

  if (!props.isVisible) {
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
          <Text preset="title" style={{ fontWeight: "bold", textAlign: "center" }}>
            {"Shortwaits\nPremium"}
          </Text>
          <Space size="small" />
          <Container direction="row" justifyContent="center" alignItems="flex-end">
            <Text preset="title">{"$1.50/"}</Text>
            <Text preset="titleSmall">{"month"}</Text>
          </Container>
          <Space size="small" />
          <View>
            {premiumAccountFeatures.map((elem, index) => {
              return <CheckedList key={elem.name + index} text={elem.description} />;
            })}
          </View>
          <Space />
          <Button onPress={handleOnPress} text="GET PREMIUM" />
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
