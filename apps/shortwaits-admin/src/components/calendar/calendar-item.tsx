import React, { FC, useCallback } from "react";
import {
  Alert,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  SectionListRenderItem,
} from "react-native";
import { EventDtoType, EventStatusName } from "@shortwaits/shared-types";
import { isEmpty, truncate } from "lodash";

import { Emoji, Text } from "../";
import { useTheme } from "../../theme";
import { getEventTime } from "./calendar-utils";
import defaultUserImage from "../../assets/images/user.png";
import { useService } from "../../redux";

// type AgendaItemProps = {
//   item: EventDtoType;
//   index: number;
//   section: { title: string; data: EventDtoType[] };
// };
type AgendaItemProps = SectionListRenderItem<
  EventDtoType,
  { title: string; data: EventDtoType[]; index: number }
>;

const BORDER_RADIUS = 6;
const statusDisplayMessages: Record<EventStatusName, string> = {
  PENDING: "Waiting on response",
  APPROVED: "Request accepted",
  REJECTED: "Request denied",
  CANCELED: "Request Canceled",
  COMPLETED: "Request Completed",
};

export const AgendaItem: AgendaItemProps = props => {
  const { item, index, section } = props;
  // console.log("AgendaItem >>>", JSON.stringify(props));

  const { Colors } = useTheme();
  const service = useService(item?.serviceId);

  console.log("serviceId >>> ", index, item?.serviceId, section.index);
  console.log("service >>>", JSON.stringify(service, null, 2));

  const itemPressed = useCallback(() => {
    Alert.alert(item.name);
  }, [item.name]);

  const EventServiceColor = () => (
    <View
      style={[
        styles.eventServiceColor,
        {
          backgroundColor:
            service?.serviceColor?.hexCode ?? Colors.brandAccent1,
        },
      ]}
    />
  );
  const EventTime = () => (
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
  );
  const EventName = () => (
    <View style={styles.eventName}>
      <View style={styles.eventNameFloatingLabels}>
        <Emoji name="wheelchair" />
        <Emoji name="star2" />
      </View>
      {item?.leadClientId ? (
        <Text
          preset="none"
          style={[styles.eventNameRow1, { color: Colors.text }]}
          text={truncate(item.leadClientId, { length: 10, separator: "." })}
        />
      ) : null}
      <Text
        preset="none"
        style={[
          styles.eventNameRow2,
          { color: service?.serviceColor?.hexCode ?? Colors.subText },
        ]}
        text={truncate(item?.name ?? "", { length: 21, separator: "." })}
      />
      <Text
        style={[
          styles.eventNameRow3,
          { color: Colors[item.status?.statusName ?? "text"] },
        ]}
        preset={"text"}
        text={
          item.status?.statusName
            ? statusDisplayMessages[item.status.statusName]
            : ""
        }
      />
    </View>
  );
  const EventClientImage = ({ item }) => {
    return (
      <View style={styles.eventClientImage}>
        <Image
          source={defaultUserImage}
          style={styles.eventClientImageColumn}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={itemPressed}
      style={[
        styles.calendarItem,
        { backgroundColor: Colors.white, borderBottomColor: Colors.lightGray },
      ]}
    >
      <EventServiceColor />
      <EventClientImage item={item} />
      <EventName />
      <EventTime />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
  eventServiceColor: {
    height: "100%",
    width: 10,
    borderTopStartRadius: BORDER_RADIUS,
    borderBottomStartRadius: BORDER_RADIUS,
  },
  eventTime: {
    paddingHorizontal: 5,
    justifyContent: "center",

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
    fontSize: 14.5,
    fontWeight: "500",
  },
  eventNameRow3: {
    fontSize: 14.5,
    fontWeight: "500",
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
  },
  calendarItem: {
    height: 75,
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",

    marginHorizontal: 5,
    borderRadius: BORDER_RADIUS,
  },
});
