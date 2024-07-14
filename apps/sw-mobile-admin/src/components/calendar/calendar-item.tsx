import { useFocusEffect } from "@react-navigation/native";
import { EventDtoType } from "@shortwaits/shared-lib";
import {
  CALENDAR_EVENT_HEIGHT,
  EVENT_ITEM_BORDER_RADIUS,
  Emoji,
  EventStatusButtons,
  Space,
  Text,
  statusDisplayMessages,
  statusDisplayMessagesBackgroundColor,
  statusDisplayMessagesColor,
  useTheme,
} from "@shortwaits/shared-ui";
import { isEmpty, truncate } from "lodash";
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Alert, Animated, Pressable, StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { navigate } from "../../navigation";
import { useUpdateBusinessEventMutation } from "../../services";
import { useService } from "../../store";
import { getEventTime } from "./calendar-utils";

type AgendaItemProps = {
  item: EventDtoType;
  triggerTick?: boolean;
  disabled?: boolean;
};

export const AgendaItem = (props: AgendaItemProps) => {
  const { item, triggerTick = false, disabled } = props;
  const swipeableRef = React.useRef<Swipeable>(null);
  const { Colors } = useTheme();
  const intl = useIntl();
  const service = useService(item?.serviceId ?? "");
  const borderColor = disabled ? Colors.white : Colors.lightGray;
  const [updateBusinessEvent, updateEventStatus] = useUpdateBusinessEventMutation(); // todo update to new api hook

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

  const eventServiceColor = useCallback(() => {
    if (!service?.serviceColor?.hexCode) {
      return <View style={[styles.eventServiceColor]} />;
    }
    return (
      <View
        style={[
          styles.eventServiceColor,
          {
            backgroundColor: service?.serviceColor?.hexCode,
          },
        ]}
      />
    );
  }, [service?.serviceColor?.hexCode]);

  const renderRightActions = (_progress: Animated.AnimatedInterpolation<any>, dragX: Animated.AnimatedInterpolation<any>) => {
    return (
      <EventStatusButtons
        event={item}
        size="small"
        onPress={status => {
          console.log("status", status);
          updateBusinessEvent({
            body: {
              ...item,
              status: {
                statusName: status,
                statusCode: item.status?.statusCode,
              },
            },
            businessId: item.businessId,
          });
        }}
      />
    );
  };

  const eventTime = useCallback(
    () => (
      <View style={[styles.eventTime, { borderLeftColor: borderColor }]}>
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
    [Colors.subText, Colors.text, borderColor, item.durationInMin, item.startTime]
  );

  const eventDescription = useCallback(() => {
    const hasLabels = !isEmpty(item.labels);
    const clientsCount = item?.clientsIds?.length ?? 0;
    const localClientsCount = item?.localClientsIds?.length ?? 0;
    const totalClients = clientsCount + localClientsCount;

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
          <Text style={{ color: Colors.subText, fontSize: 12, textAlign: "center" }}>{`${intl.formatMessage({ id: "CalendarItem.clients" })}: ${totalClients}`}</Text>
          <Text style={{ color: Colors.subText, fontSize: 12, textAlign: "center" }}>{`${intl.formatMessage({ id: "CalendarItem.staff" })}: ${item?.staffIds?.length ?? 0}`}</Text>
        </View>
      </View>
    );
  }, [Colors.subText, Colors.text, intl, item?.clientsIds?.length, item.labels, item?.localClientsIds?.length, item?.name, item?.staffIds?.length]);

  const eventStatus = useCallback(() => {
    const isPublicEvent = item.isPublicEvent;
    const statusName = item.status?.statusName ?? "";
    const statusDisplayMessage = statusName ? statusDisplayMessages[item.status.statusName] : "";
    const _statusDisplayMessagesBackgroundColor = statusDisplayMessagesBackgroundColor[statusName] ?? Colors.lightGray;
    const _statusDisplayMessagesColor = statusDisplayMessagesColor[statusName] ?? Colors.text;
    return (
      <View style={[styles.statusContainer, { borderLeftColor: borderColor }]}>
        <View
          style={{
            backgroundColor: _statusDisplayMessagesBackgroundColor,
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
                color: _statusDisplayMessagesColor,
                width: "100%",
              },
            ]}
            preset={"none"}
            text={intl.formatMessage({ id: `CalendarItem.status.${statusDisplayMessage ? statusDisplayMessage : "unknown"}` })}
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
  }, [Colors.lightGray, Colors.subText, Colors.text, borderColor, intl, item.isPublicEvent, item.status.statusName]);

  const renderPressable = useCallback(() => {
    return (
      <Pressable
        onPress={handleOnPress}
        disabled={disabled}
        onLongPress={handleOnLongPress}
        style={[
          styles.calendarItem,
          {
            backgroundColor: disabled ? Colors.lightBackground : Colors.white,
          },
        ]}
      >
        {eventServiceColor()}
        {eventDescription()}
        {eventStatus()}
        {eventTime()}
      </Pressable>
    );
  }, [Colors.lightBackground, Colors.white, disabled, eventDescription, eventServiceColor, eventStatus, eventTime, handleOnLongPress, handleOnPress]);

  if (!item) return null;

  if (disabled) {
    return renderPressable();
  }

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
      {renderPressable()}
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
    backgroundColor: "transparent",
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
    flexDirection: "row",
  },
  eventDescription: {
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
    zIndex: 10,
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
