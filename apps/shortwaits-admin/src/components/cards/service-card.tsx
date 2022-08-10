import React, { FC } from "react";
import { Alert, Image, ImageBackground, StyleSheet, View } from "react-native";
import { ServicesType } from "@shortwaits/shared-types";

import { Button, ButtonProps, Space, Text } from "../common";
import { getDimensions, useTheme } from "../../theme";
import { getPrettyStringFromDurationInMin } from "../../utils/time";
import { getPrettyStringFromPrice } from "../../utils/currency";
import { ServiceAvatar } from "../service-avatar/service-avatar";

const CARD_HEIGH = 90;

interface ServiceCardProps extends ButtonProps {
  service: Partial<ServicesType>;
}

export const ServiceCard: FC<ServiceCardProps> = (props) => {
  const { Colors } = useTheme();
  const {
    service: {
      imageUrl,
      name,
      serviceColor,
      durationInMin,
      price,
      currency,
      urls,
      hours,
    },
    ...rest
  } = props;
  const { width } = getDimensions();

  return (
    <Button
      onLongPress={() =>
        Alert.alert(
          `Delete ${name}`,
          `This will remove all reservations, images and publishment related to the service.`,
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => {},
              style: "destructive",
            },
          ],
          {
            cancelable: true,
          }
        )
      }
      preset="none"
      style={[
        cardStyle.container,
        {
          height: CARD_HEIGH,
          width: width * 0.9,
          borderLeftColor: serviceColor.hexCode || Colors.transparent,
          backgroundColor: Colors.backgroundOverlay,
        },
      ]}
      {...rest}
    >
      <View style={cardStyle.textItems}>
        <Text
          text={name}
          style={[cardStyle.textItem1, { color: Colors.text }]}
        />
        <Text
          text={getPrettyStringFromDurationInMin(durationInMin)}
          style={[cardStyle.textItem2, { color: Colors.gray }]}
        />
        <Text
          text={getPrettyStringFromPrice(currency, price)}
          style={[
            cardStyle.textItem3,
            { color: serviceColor.hexCode || Colors.text },
          ]}
        />
      </View>
      <ServiceAvatar
        imageUrl={imageUrl}
        size={"default"}
        serviceColor={serviceColor}
      />
      <Space size="tiny" direction="vertical" />
    </Button>
  );
};
const cardStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderLeftWidth: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  textItems: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textItem1: {
    fontSize: 15,
    fontWeight: "500",
  },
  textItem2: {
    fontSize: 13,
  },
  textItem3: {
    fontSize: 15,
    fontWeight: "bold",
  },
  imageContainer: {
    opacity: 0.8,
    height: CARD_HEIGH * 0.7,
    width: CARD_HEIGH * 0.7,
    borderRadius: CARD_HEIGH * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {},
});
