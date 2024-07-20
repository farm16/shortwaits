import { ServiceDtoType } from "@shortwaits/shared-lib";
import { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { getDimensions, useTheme } from "../../theme";
import { getPrettyStringFromPrice } from "../../utils/currency";
import { getPrettyStringFromDurationInMin } from "../../utils/time";
import { Avatar } from "../avatar/avatar";
import { Button, Space, Text } from "../common";

const CARD_HEIGH = 90;

interface ServiceCardProps {
  onPress(arg: ServiceDtoType): void;
  onLongPress?(arg: ServiceDtoType): void;
  service: ServiceDtoType;
  style?: ViewStyle;
  isSelected?: boolean;
  disabled?: boolean;
}

export const ServiceItem: FC<ServiceCardProps> = props => {
  const { Colors } = useTheme();
  const { service, onPress, onLongPress, style: styleOverride, isSelected, disabled, ...rest } = props;
  const { width } = getDimensions();

  const selectedStyle = isSelected
    ? ({
        borderColor: service.serviceColor?.hexCode + "80",
        borderLeftColor: service.serviceColor?.hexCode,
        borderLeftWidth: 5,
        borderWidth: 2,
      } as ViewStyle)
    : {};

  const handlePress = () => {
    if (onPress) {
      onPress(service);
    }
  };

  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(service);
    }
  };
  const duration = service.durationInMin === 0 ? "No time limit" : getPrettyStringFromDurationInMin(service.durationInMin);
  return (
    <Button
      onPress={handlePress}
      onLongPress={handleLongPress}
      preset="none"
      style={[
        styles.container,
        {
          height: CARD_HEIGH,
          width: width * 0.9,
          borderLeftColor: service.serviceColor?.hexCode || Colors.transparent,
          backgroundColor: Colors.lightBackground,
        },
        styleOverride,
        selectedStyle,
        disabled ? styles.noShadow : {},
      ]}
      disabled={disabled}
      {...rest}
    >
      <View style={styles.textItems}>
        <Text text={service.name} style={[styles.textItem1, { color: Colors.text }]} />
        <Text text={duration} style={[styles.textItem2, { color: Colors.subText }]} />
        <Text text={getPrettyStringFromPrice(service.currency, service.price)} style={[styles.textItem3, { color: service.serviceColor?.hexCode || Colors.text }]} />
      </View>
      <Avatar url={service.imageUrl} size={"default"} color={Colors.gray} mode={"static"} />
      <Space size="tiny" direction="vertical" />
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderLeftWidth: 5,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  noShadow: {
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
    elevation: undefined,
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
