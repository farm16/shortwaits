import React, { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { ServiceDtoType } from "@shortwaits/shared-types";

import { Button, ButtonProps, Space, Text } from "../common";
import { getDimensions, useTheme } from "../../theme";
import { getPrettyStringFromDurationInMin } from "../../utils/time";
import { getPrettyStringFromPrice } from "../../utils/currency";
import { Avatar } from "../avatar/avatar";
import { noop } from "lodash";

const CARD_HEIGH = 90;

type ServiceCardProps = ButtonProps & {
  onPress(arg: ServiceDtoType): void;
  onLongPress?(arg: ServiceDtoType): void;
  service: ServiceDtoType;
  style?: ViewStyle;
};

export const ServiceItem: FC<ServiceCardProps> = props => {
  const { Colors } = useTheme();
  const {
    service,
    onPress,
    onLongPress = noop,
    style: styleOverride,
    ...rest
  } = props;
  const { width } = getDimensions();

  return (
    <Button
      onPress={() => onPress(service)}
      onLongPress={onLongPress}
      preset="none"
      style={[
        styles.container,
        {
          height: CARD_HEIGH,
          width: width * 0.9,
          borderLeftColor: service.serviceColor.hexCode || Colors.transparent,
          backgroundColor: Colors.backgroundOverlay,
        },
        styleOverride,
      ]}
      {...rest}
    >
      <View style={styles.textItems}>
        <Text
          text={service.name}
          style={[styles.textItem1, { color: Colors.text }]}
        />
        <Text
          text={getPrettyStringFromDurationInMin(service.durationInMin)}
          style={[styles.textItem2, { color: Colors.subText }]}
        />
        <Text
          text={getPrettyStringFromPrice(service.currency, service.price)}
          style={[
            styles.textItem3,
            { color: service.serviceColor.hexCode || Colors.text },
          ]}
        />
      </View>
      <Avatar
        imageUrl={service.imageUrl}
        size={"default"}
        serviceColor={service.serviceColor}
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
