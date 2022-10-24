import React from "react";

import { Card, CardProps, Text } from "../common";
import { useTheme } from "../../theme";
import { BusinessPayloadType } from "@shortwaits/shared-types";
import { View } from "react-native";
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
    <Card
      {...rest}
      mode="button"
      leftIconColor={Colors.orange5}
      leftIconName="certificate"
      leftIconSize={"large"}
      style={{
        borderBottomColor: undefined,
        borderBottomWidth: undefined,
        backgroundColor: Colors.background,
        borderColor: Colors.brandPrimary2,
        borderWidth: 2,
        paddingVertical: 3,
        borderRadius: 15,
      }}
    >
      <View style={{ marginLeft: 10, marginVertical: 7 }}>
        <Text
          style={{ color: Colors.brandPrimary }}
          preset="title3"
          text={"Premium"}
        />
        <Text
          style={{
            color: Colors.brandPrimary4,
            textAlignVertical: "center",
          }}
          preset="textSmall"
        >
          {membershipMessages["premium"] + " "}
          <Icon
            name={"open-in-new"}
            size={16}
            color={Colors.brandPrimary4}
          />{" "}
        </Text>
      </View>
    </Card>
  );
};
