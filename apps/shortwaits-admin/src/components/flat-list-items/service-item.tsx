import React, { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { DocType, ServicesType } from "@shortwaits/shared-types";

import { Button, ButtonProps, Space, Text } from "../common";
import { getDimensions, useTheme } from "../../theme";
import { getPrettyStringFromDurationInMin } from "../../utils/time";
import { getPrettyStringFromPrice } from "../../utils/currency";
import { Avatar } from "../avatar/avatar";

const CARD_HEIGH = 90;

interface ServiceCardProps extends ButtonProps {
  service: DocType<ServicesType>;
}

export const ServiceItem: FC<ServiceCardProps> = (props) => {
  const { Colors } = useTheme();
  const {
    service: { imageUrl, name, serviceColor, durationInMin, price, currency },
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
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => null,
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
        styles.container,
        {
          height: CARD_HEIGH,
          width: width * 0.9,
          borderLeftColor: serviceColor.hexCode || Colors.transparent,
          backgroundColor: Colors.backgroundOverlay,
        },
      ]}
      {...rest}
    >
      <View style={styles.textItems}>
        <Text text={name} style={[styles.textItem1, { color: Colors.text }]} />
        <Text
          text={getPrettyStringFromDurationInMin(durationInMin)}
          style={[styles.textItem2, { color: Colors.subText }]}
        />
        <Text
          text={getPrettyStringFromPrice(currency, price)}
          style={[
            styles.textItem3,
            { color: serviceColor.hexCode || Colors.text },
          ]}
        />
      </View>
      <Avatar
        imageUrl={imageUrl}
        size={"default"}
        serviceColor={serviceColor}
      />
      <Space size="tiny" direction="vertical" />
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderLeftWidth: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  textItems: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
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
