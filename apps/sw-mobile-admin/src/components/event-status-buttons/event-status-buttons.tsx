import { EventDtoType } from "@shortwaits/shared-lib";
import React from "react";
import { useIntl } from "react-intl";
import { Dimensions, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Text } from "..";
import { useUpdateEventMutation } from "../../services";
import { useBusiness } from "../../store";
import { useTheme } from "../../theme";
import { CALENDAR_EVENT_HEIGHT, EVENT_ITEM_BORDER_RADIUS, eventStatusColors, eventStatusIconNames, eventStatusNames, getFontSize, nextEventStatuses } from "../../utils";

export const EventStatusButtons: React.FC<{
  event: EventDtoType;
  size?: "small" | "large";
}> = ({ event, size = "large" }) => {
  const { _id: businessId } = useBusiness();
  const { Colors } = useTheme();
  const intl = useIntl();
  const [updateEvent, updatedEvent] = useUpdateEventMutation();

  const statusCount = nextEventStatuses[event?.status?.statusName ?? ""].length;

  const _width = (Dimensions.get("window").width - 32) / statusCount;

  const cardHeight = size === "small" ? CALENDAR_EVENT_HEIGHT : CALENDAR_EVENT_HEIGHT;
  const cardWidth = size === "small" ? CALENDAR_EVENT_HEIGHT : _width;

  // const isDisabled =

  const handleStatusUpdate = status => {
    updateEvent({
      businessId,
      body: {
        ...event,
        status: {
          statusCode: event.status.statusCode,
          statusName: status,
        },
      },
    });
  };

  return (
    <View style={[styles.container]}>
      {updatedEvent.isLoading ? (
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
                      fontSize: getFontSize(16),
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
    // add shadow for ios and android
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 1,
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
