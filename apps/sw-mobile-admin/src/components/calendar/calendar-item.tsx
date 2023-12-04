import { useFocusEffect } from "@react-navigation/native";
import { EventDtoType } from "@shortwaits/shared-lib";
import { isEmpty, truncate } from "lodash";
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Alert, Animated, Pressable, StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Emoji, EventStatusButtons, Space, Text } from "..";
import { navigate } from "../../navigation";
import { useService } from "../../store";
import { useTheme } from "../../theme";
import { CALENDAR_EVENT_HEIGHT, EVENT_ITEM_BORDER_RADIUS } from "../../utils";
import { statusDisplayMessages, statusDisplayMessagesBackgroundColor, statusDisplayMessagesColor } from "../../utils/status-color";
import { getEventTime } from "./calendar-utils";

type AgendaItemProps = {
  item: EventDtoType;
  triggerTick?: boolean;
};

export const AgendaItem = (props: AgendaItemProps) => {
  const { item, triggerTick = false } = props;
  const swipeableRef = React.useRef<Swipeable>(null);
  const { Colors } = useTheme();
  const intl = useIntl();
  const service = useService(item?.serviceId ?? "");

  useFocusEffect(() => {
    if (triggerTick) {
      swipeableRef.current?.openRight();
      const timerId = setTimeout(() => {
        swipeableRef.current?.close();
      }, 1000);
      return () => {
        clearTimeout(timerId);
      };
    }
  });

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
  const renderRightActions = (_progress: Animated.AnimatedInterpolation<any>, dragX: Animated.AnimatedInterpolation<any>) => {
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
        <Text preset="none" style={[styles.eventTimeRow2, { color: Colors.subText }]} text={getEventTime(item.durationInMin * 60000)} />
      </View>
    ),
    [Colors.lightGray, Colors.subText, Colors.text, item.durationInMin, item.startTime]
  );

  const eventDescription = useCallback(() => {
    const hasLabels = !isEmpty(item.labels);
    return (
      <View style={styles.eventDescription}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "stretch",
          }}
        >
          <Text
            preset="none"
            style={[styles.eventNameRow1, { color: Colors.text, flex: 1 }]}
            text={truncate(item?.name ?? "", {
              separator: " ",
              length: hasLabels ? 14 : 23,
            })}
          />
          {hasLabels ? (
            <View style={styles.eventNameFloatingLabels}>
              {item.labels.map((label, index) => {
                return <Emoji key={index} name={label.emojiShortName} />;
              })}
            </View>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "stretch",
          }}
        >
          <Text style={{ color: Colors.subText, fontSize: 12, textAlign: "center" }}>
            {`${intl.formatMessage({ id: "CalendarItem.clients" })}: ${item?.clientsIds?.length ?? 0}`}
          </Text>
          <Text style={{ color: Colors.subText, fontSize: 12, textAlign: "center" }}>{`${intl.formatMessage({ id: "CalendarItem.staff" })}: ${item?.staffIds?.length ?? 0}`}</Text>
        </View>
      </View>
    );
  }, [Colors.subText, Colors.text, intl, item?.clientsIds?.length, item.labels, item?.name, item?.staffIds?.length]);

  const eventStatus = useCallback(() => {
    const isPublicEvent = item.isPublicEvent;
    const statusName = item.status?.statusName ? statusDisplayMessages[item.status.statusName] : "";
    return (
      <View style={[styles.statusContainer, { borderLeftColor: Colors.lightGray }]}>
        <View
          style={{
            backgroundColor: statusDisplayMessagesBackgroundColor[item.status.statusName],
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.eventNameRow2,
              {
                color: statusDisplayMessagesColor[item.status.statusName],
                width: "100%",
              },
            ]}
            preset={"none"}
            text={intl.formatMessage({ id: `CalendarItem.status.${statusName}` })}
          />
        </View>
        <Space size="tiny" />
        <Text
          style={[styles.eventTimeRow2, { color: Colors.subText }]}
          preset="none"
          text={isPublicEvent ? intl.formatMessage({ id: "CalendarItem.publicEvent" }) : intl.formatMessage({ id: "CalendarItem.privateEvent" })}
        />
      </View>
    );
  }, [Colors.lightGray, Colors.subText, intl, item.isPublicEvent, item.status.statusName]);

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
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
        {eventDescription()}
        {eventStatus()}
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
    width: 6,
    borderTopStartRadius: EVENT_ITEM_BORDER_RADIUS,
    borderBottomStartRadius: EVENT_ITEM_BORDER_RADIUS,
  },
  statusContainer: {
    height: "100%",
    width: 110,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
  eventTime: {
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
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
    // right: 5,
    // top: 0,
    // position: "absolute",
    flexDirection: "row",
  },
  eventDescription: {
    // backgroundColor: "red",
    flexGrow: 1,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  eventNameRow1: {
    fontSize: 15,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  eventNameRow2: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
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
