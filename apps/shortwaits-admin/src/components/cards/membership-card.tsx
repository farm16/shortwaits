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
    premium: "Uncover many premium features",
  };
  const { Colors } = useTheme();
  return (
    <Card
      {...rest}
      mode="button"
      leftIconColor={Colors.brandPrimary3}
      leftIconName="certificate"
      leftIconSize={"large"}
      style={{
        borderBottomColor: undefined,
        borderBottomWidth: undefined,
        backgroundColor: Colors.brandPrimary1,
        borderColor: Colors.brandPrimary5,
        borderWidth: 0,
        borderRadius: 30,
      }}
    >
      <View style={{ marginLeft: 10, marginVertical: 7 }}>
        <Text
          style={{ color: Colors.brandPrimary7 }}
          preset="title3"
          text={"Premium"}
        />
        <Text
          style={{
            color: Colors.brandPrimary8,
            textAlignVertical: "center",
          }}
          preset="textSmall"
        >
          {membershipMessages["premium"] + " "}
          <Icon
            name={"open-in-new"}
            size={16}
            color={Colors.brandPrimary8}
          />{" "}
        </Text>
      </View>
    </Card>
  );
};
