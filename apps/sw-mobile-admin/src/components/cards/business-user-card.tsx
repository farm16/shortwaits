import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, View, Image, Pressable, TouchableOpacity } from "react-native";

import { Button, ButtonProps, Text } from "../common";
import { useTheme } from "../../theme";
import { BusinessUserDtoType } from "@shortwaits/shared-lib";

export type BusinessUserCardProps = ButtonProps & {
  user: BusinessUserDtoType;
};

const CARD_HEIGHT = 70;

export const BusinessUserCard = (props: BusinessUserCardProps) => {
  const { Colors } = useTheme();

  const { user } = props;

  return (
    <Button preset="card" disabled={true} style={[styles.cardHeight]}>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}
        onPress={() => {
          alert("pressed");
        }}
      >
        <Image
          resizeMode="cover"
          source={{
            uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
          }}
          style={{ width: 45, height: 45, borderRadius: 22.5, marginRight: 16 }}
        />
        <Text preset="cardTitle" text={user.familyName ?? ""} />
      </Pressable>
      <TouchableOpacity style={styles.icons} onPress={() => {}}>
        <Icon name="phone" color={Colors.brandSecondary} size={23} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icons} onPress={() => {}}>
        <Icon name="message-text-outline" color={Colors.brandSecondary} size={23} />
      </TouchableOpacity>
    </Button>
  );
};

const styles = StyleSheet.create({
  cardHeight: {
    minHeight: CARD_HEIGHT,
    maxHeight: CARD_HEIGHT,
  },
  icons: {
    alignSelf: "stretch",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
