import React, { FC, useCallback } from "react";
import { Alert, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { EventPayloadType } from "@shortwaits/shared-types";
import { isEmpty, truncate } from "lodash";

import { Emoji, Text } from "../";
import { useTheme } from "../../theme";
import { getEventTime } from "./calendar-tools";
import defaultUserImage from "../../assets/images/user.png";
import { useService } from "../../redux";

type AgendaItemProps = { item: EventPayloadType };
const BORDER_RADIUS = 6;
const statusDisplayMessages = {
  success: "Request accepted",
  failed: "Request denied",
  pending: "Waiting on response",
};

export const AgendaItem: FC<AgendaItemProps> = (props) => {
  const { item } = props;
  const { Colors } = useTheme();
  const service = useService(item.service);

  const itemPressed = useCallback(() => {
    Alert.alert(item.name);
  }, [item.name]);

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
      backgroundColor: service?.serviceColor.hexCode ?? "",
    },
    eventTime: {
      paddingHorizontal: 5,
      justifyContent: "center",
      borderLeftColor: Colors.lightGray,
      borderLeftWidth: 1,
      height: "100%",
    },
    eventTimeRow1: {
      fontSize: 16.5,
      color: Colors.text,
      marginBottom: 5,
      fontWeight: "500",
    },
    eventTimeRow2: {
      fontSize: 12,
      color: Colors.subText,
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
      color: Colors.text,
      fontSize: 16,
      fontWeight: "500",
      textTransform: "capitalize",
    },
    eventNameRow2: {
      color: service?.serviceColor.hexCode ?? Colors.subText,
      fontSize: 14.5,
      fontWeight: "500",
    },
    eventNameRow3: {
      color: Colors[item.status?.statusName ?? "text"],
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
      backgroundColor: Colors.white,
      borderBottomColor: Colors.lightGray,
      marginHorizontal: 5,
      borderRadius: BORDER_RADIUS,
    },
  });

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  const EventServiceColor = () => <View style={styles.eventServiceColor} />;
  const EventTime = () => (
    <View style={styles.eventTime}>
      <Text
        preset="none"
        style={styles.eventTimeRow1}
        text={new Date(item.startTime).toLocaleTimeString([], {
          timeStyle: "short",
        })}
      />
      <Text
        preset="none"
        style={styles.eventTimeRow2}
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
      {item.leadClientName ? (
        <Text
          preset="none"
          style={styles.eventNameRow1}
          text={truncate(item.leadClientName, { length: 10, separator: "." })}
        />
      ) : null}
      <Text
        preset="none"
        style={styles.eventNameRow2}
        text={truncate(service.name, { length: 21, separator: "." })}
      />
      <Text
        style={styles.eventNameRow3}
        preset={item.status?.statusName}
        text={
          item.status?.statusName
            ? statusDisplayMessages[item.status.statusName]
            : ""
        }
      />
    </View>
  );
  const EventClientImage = () => (
    <View style={styles.eventClientImage}>
      <Image
        source={{
          uri: item.eventImage,
        }}
        defaultSource={defaultUserImage}
        style={styles.eventClientImageColumn}
      />
    </View>
  );

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.calendarItem}>
      <EventServiceColor />
      <EventClientImage />
      <EventName />
      <EventTime />
    </TouchableOpacity>
  );
};
