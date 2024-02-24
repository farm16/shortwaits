import { EventDtoType, EventStatusName } from "@shortwaits/shared-lib";
import React from "react";
import { useIntl } from "react-intl";
import { Dimensions, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Text } from "..";
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

  return (
    <View style={[styles.container]}>
      {isLoading ? (
        <View
          style={{
            width: cardWidth,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        nextEventStatuses[event?.status?.statusName ?? ""].map((status, index) => {
          const isEndButton = nextEventStatuses[event?.status?.statusName ?? ""].length - 1 === index;
          const isStartButton = index === 0;
          return (
            <Button
              key={index}
              preset="none"
              onPress={() => handleStatusUpdate(status)}
              style={[
                styles.button,
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
              ) : null}
              {/* {nextEventStatuses[event?.status?.statusName ?? ""].length - 1 !== index ? (
              <View style={[styles.separator]} />
            ) : null} */}
            </Button>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: EVENT_ITEM_BORDER_RADIUS,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    width: StyleSheet.hairlineWidth * 2,
    alignSelf: "stretch",
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
});