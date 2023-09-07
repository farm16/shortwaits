import React, { useCallback } from "react";
import { Alert, View, Image, Animated, StyleSheet, Pressable } from "react-native";
import { EventDtoType } from "@shortwaits/shared-lib";
import { isEmpty, truncate } from "lodash";
import { Container, Emoji, EventStatusButtons, Text } from "..";
import { useTheme } from "../../theme";
import { getEventTime } from "./calendar-utils";
import defaultUserImage from "../../assets/images/user.png";
import { useService } from "../../store";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { navigate } from "../../navigation";
import {
  statusDisplayMessages,
  statusDisplayMessagesBackgroundColor,
  statusDisplayMessagesColor,
} from "../../utils/status-color";
import { CALENDAR_EVENT_HEIGHT, EVENT_ITEM_BORDER_RADIUS } from "../../utils";

type AgendaItemProps = {
  item: EventDtoType;
};

export const AgendaItem = (props: AgendaItemProps) => {
  const { item } = props;
  const { Colors } = useTheme();
  const service = useService(item?.serviceId ?? "");

  const handleOnPress = useCallback(() => {
    navigate("authorized-stack", {
      screen: "event-screen",
      params: { eventId: item._id },
    });
  }, [item]);

  const handleOnLongPress = useCallback(() => {
    Alert.alert(item.name);
  }, [item.name]);

  const eventServiceColor = useCallback(
    () => (
      <View
        style={[
          styles.eventServiceColor,
          {
            backgroundColor: service?.serviceColor?.hexCode ?? Colors.brandAccent1,
          },
        ]}
      />
    ),
    [Colors.brandAccent1, service?.serviceColor?.hexCode]
  );
  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<any>,
    dragX: Animated.AnimatedInterpolation<any>
  ) => {
    return <EventStatusButtons event={item} size="small" />;
  };

  const eventTime = useCallback(
    () => (
      <View style={[styles.eventTime, { borderLeftColor: Colors.lightGray }]}>
        <Text
          preset="none"
          style={[styles.eventTimeRow1, { color: Colors.text }]}
          text={new Date(item.startTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
        <Text
          preset="none"
          style={[styles.eventTimeRow2, { color: Colors.subText }]}
          text={getEventTime(item.durationInMin * 60000)}
        />
      </View>
    ),
    [Colors.lightGray, Colors.subText, Colors.text, item.durationInMin, item.startTime]
  );

  const eventName = useCallback(
    () => (
      <View style={styles.eventName}>
        <View style={styles.eventNameFloatingLabels}>
          {isEmpty(item.labels)
            ? null
            : item.labels.map((label, index) => {
                return <Emoji key={index} name={label.emojiShortName} />;
              })}
        </View>
        <Text
          preset="none"
          style={[styles.eventNameRow1, { color: Colors.text }]}
          text={truncate(item?.name ?? "", { length: 21, separator: "." })}
        />
        <Container direction="row">
          {/* <Text style={[styles.eventNameRow2, { color: Colors.subText }]} preset="none" text={"status: "} /> */}
          <View
            style={{
              backgroundColor: statusDisplayMessagesBackgroundColor[item.status.statusName],
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 5,
            }}
          >
            <Text
              style={[
                styles.eventNameRow2,
                {
                  color: statusDisplayMessagesColor[item.status.statusName],
                },
              ]}
              preset={"none"}
              text={item.status?.statusName ? statusDisplayMessages[item.status.statusName] : ""}
            />
          </View>
        </Container>
      </View>
    ),
    [Colors.text, item?.labels, item?.name, item.status?.statusName]
  );

  const eventClientImage = useCallback(() => {
    const isGroupEvent = item.isGroupEvent;
    const client = isGroupEvent ? "" : item.leadClientId ?? "";
    return (
      <View style={styles.eventClientImage}>
        <Image source={defaultUserImage} style={styles.eventClientImageColumn} />
        {client && <Text style={styles.eventClientName} preset={"none"} text={client} />}
      </View>
    );
  }, [item.isGroupEvent, item.leadClientId]);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Pressable
        onPress={handleOnPress}
        onLongPress={handleOnLongPress}
        style={[
          styles.calendarItem,
          {
            zIndex: 10,
            backgroundColor: "#FFFFFF",
          },
        ]}
      >
        {eventServiceColor()}
        {eventClientImage()}
        {eventName()}
        {eventTime()}
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
  eventServiceColor: {
    height: "100%",
    width: 10,
    borderTopStartRadius: EVENT_ITEM_BORDER_RADIUS,
    borderBottomStartRadius: EVENT_ITEM_BORDER_RADIUS,
  },
  eventTime: {
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderLeftWidth: 1,
    height: "100%",
  },
  eventTimeRow1: {
    fontSize: 16.5,
    marginBottom: 5,
    fontWeight: "500",
  },
  eventTimeRow2: {
    fontSize: 12,
    textAlign: "center",
    width: "100%",
  },
  eventNameFloatingLabels: {
    right: 5,
    top: 0,
    position: "absolute",
    flexDirection: "row",
  },
  eventName: {
    justifyContent: "space-evenly",
    flexGrow: 1,
    marginVertical: 6,
    alignSelf: "stretch",
  },
  eventNameRow1: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  eventNameRow2: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  eventClientImage: {
    height: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  eventClientImageColumn: {
    borderRadius: 27.5,
    height: 55,
    width: 55,
    resizeMode: "contain",
    borderWidth: 0.2,
    borderColor: "lightgrey",
  },
  eventClientName: {
    fontSize: 14.5,
    fontWeight: "500",
  },
  calendarItem: {
    height: CALENDAR_EVENT_HEIGHT,
    // borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 5,
    borderRadius: EVENT_ITEM_BORDER_RADIUS,
  },
  rightAction: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontWeight: "600",
    padding: 20,
  },
});
