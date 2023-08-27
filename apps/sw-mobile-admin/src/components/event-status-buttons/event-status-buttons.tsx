import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button, Text } from "..";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../theme";
import { EventDtoType } from "@shortwaits/shared-lib";
import {
  CALENDAR_EVENT_HEIGHT,
  EVENT_ITEM_BORDER_RADIUS,
  eventStatusColors,
  eventStatusIconNames,
  eventStatusNames,
  nextEventStatuses,
} from "../../utils";
import { useUpdateEventMutation } from "../../services";
import { useBusiness } from "../../store";
import { ActivityIndicator } from "react-native-paper";

export const EventStatusButtons: React.FC<{
  event: EventDtoType;
  size?: "small" | "large";
}> = ({ event, size = "large" }) => {
  const { _id: businessId } = useBusiness();
  const { Colors } = useTheme();

  const statusCount = nextEventStatuses[event?.status?.statusName ?? ""].length;

  const _width = (Dimensions.get("window").width - 32) / statusCount;

  const cardHeight = size === "small" ? CALENDAR_EVENT_HEIGHT : CALENDAR_EVENT_HEIGHT;
  const cardWidth = size === "small" ? CALENDAR_EVENT_HEIGHT : _width;

  const [updateEvent, updatedEvent] = useUpdateEventMutation();

  const handleStatusUpdate = status => {
    console.log(status);
    console.log(event.status);
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
                  text={eventStatusNames[status]}
                  preset="none"
                  style={[
                    {
                      marginTop: 8,
                      color: Colors.brandAccent1,
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
