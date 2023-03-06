import React from "react";

import { Card, CardProps, Container, Text } from "../common";
import { useTheme } from "../../theme";
import { BusinessPayloadType } from "@shortwaits/shared-types";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ButtonCardProps extends Omit<CardProps, "mode"> {
  business: BusinessPayloadType;
}
export const MembershipCard = (props: ButtonCardProps) => {
  const { business, ...rest } = props;
  const membershipMessages = {
    free: "",
    premium: "Uncover many awesome features",
  };
  const { Colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        height: 60,
        flexDirection: "row",
        backgroundColor: Colors.brandPrimary,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Icon name={"hexagram"} size={23} color={Colors.orange1} />
      <Container style={{ alignItems: "center" }}>
        <Text
          style={{
            color: Colors.white,
            fontWeight: "bold",
          }}
          preset="text"
          text={"Enjoy Premium"}
        />
        <Text
          style={{
            color: Colors.white,
            textAlignVertical: "center",
          }}
          preset="textSmall"
        >
          {membershipMessages["premium"] + " "}
        </Text>
      </Container>
      <Icon name={"hexagram"} size={23} color={Colors.orange1} />
    </TouchableOpacity>
  );
};
