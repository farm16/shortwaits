import { EventDtoType, EventStatusName } from "@shortwaits/shared-lib";
import React from "react";
import { useIntl } from "react-intl";
import { Dimensions, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ActivityIndicator, Button, Text } from "..";
import { useTheme } from "../../theme";
import { CALENDAR_EVENT_HEIGHT, EVENT_ITEM_BORDER_RADIUS, eventStatusColors, eventStatusIconNames, eventStatusNames, getResponsiveFontSize, nextEventStatuses } from "../../utils";

type EventStatusButtonsProps = {
  event: EventDtoType;
  size?: "small" | "large";
  onPress?(status: EventStatusName): void;
  isLoading?: boolean;
};

export const EventStatusButtons: React.FC<EventStatusButtonsProps> = ({ event, onPress, isLoading, size = "large" }) => {
  const { Colors } = useTheme();
  const intl = useIntl();

  const statusCount = nextEventStatuses[event?.status?.statusName ?? ""].length;
  const _width = (Dimensions.get("window").width - 32) / statusCount;
  const cardHeight = size === "small" ? CALENDAR_EVENT_HEIGHT : CALENDAR_EVENT_HEIGHT;
  const cardWidth = size === "small" ? CALENDAR_EVENT_HEIGHT : _width;

  const handleStatusUpdate = (status: EventStatusName) => {
    if (onPress) {
      onPress(status);
    }
  };

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={[styles.container]}>
      {nextEventStatuses[event?.status?.statusName ?? ""].map((status, index) => {
        const isEndButton = nextEventStatuses[event?.status?.statusName ?? ""].length - 1 === index;
        const isStartButton = index === 0;
        return (
          <Button
            key={index}
            preset="none"
            onPress={() => handleStatusUpdate(status)}
            style={[
              styles.button,
              size === "large" ? styles.buttonShadow : {},
              {
                height: cardHeight,
                width: cardWidth,
                borderColor: Colors.lightGray,
                borderWidth: StyleSheet.hairlineWidth,
                borderRightWidth: StyleSheet.hairlineWidth,
                borderRightColor: Colors.lightGray,
                borderTopLeftRadius: isStartButton ? EVENT_ITEM_BORDER_RADIUS : 0,
                borderBottomLeftRadius: isStartButton ? EVENT_ITEM_BORDER_RADIUS : 0,
                borderTopRightRadius: isEndButton ? EVENT_ITEM_BORDER_RADIUS : 0,
                borderBottomRightRadius: isEndButton ? EVENT_ITEM_BORDER_RADIUS : 0,
                backgroundColor: Colors[eventStatusColors[status].backgroundColor],
              },
            ]}
          >
            <Icon name={eventStatusIconNames[status]} size={24} color={Colors[eventStatusColors[status].color]} />
            {size === "large" ? (
              <Text
                text={intl.formatMessage({
                  id: `Event_Screen.eventStatusButton.status.${eventStatusNames[status]}`,
                })}
                preset="none"
                style={[
                  {
                    marginTop: 8,
                    fontWeight: "500",
                    fontSize: getResponsiveFontSize(16),
                    color: Colors[eventStatusColors[status].color],
                  },
                ]}
              />
            ) : (
              <Text
                text={intl.formatMessage({
                  id: `Event_Screen.eventStatusButton.status.${eventStatusNames[status]}`,
                })}
                preset="none"
                style={[
                  {
                    marginTop: 4,
                    fontWeight: "500",
                    fontSize: getResponsiveFontSize(10),
                    color: Colors[eventStatusColors[status].color],
                  },
                ]}
              />
            )}
          </Button>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
});
