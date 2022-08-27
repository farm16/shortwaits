import { EventType } from "@shortwaits/shared-types";
import { isEmpty } from "lodash";
import React, { FC, useCallback } from "react";
import { Alert, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Button, Container, Text } from "../";
import { useTheme } from "../../theme";
import { getEventTime } from "./calendar-tools";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { truncated } from "../../utils";
import defaultUserImage from "../../assets/images/user.png";
type AgendaItemProps = { item: EventType };
const BORDER_RADIUS = 6;
const statusDisplayMessages = {
  success: "Request accepted",
  failed: "Request denied",
  pending: "Waiting on response",
};
export const AgendaItem: FC<AgendaItemProps> = (props) => {
  const { item } = props;
  const { Colors } = useTheme();

  const itemPressed = useCallback(() => {
    Alert.alert(item.name);
  }, [item.name]);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  const EventServiceColor = () => (
    <View
      style={[
        {
          height: "100%",
          width: 10,
          borderTopStartRadius: BORDER_RADIUS,
          borderBottomStartRadius: BORDER_RADIUS,
          backgroundColor: item.service.serviceColor.hexCode,
        },
      ]}
    />
  );
  const LeftContainer = () => (
    <Container
      style={{
        paddingHorizontal: 10,
        borderRightWidth: 1,
        justifyContent: "center",
        height: 55,
        borderRightColor: Colors.lightGray,
      }}
    >
      <Text
        preset="none"
        style={{ fontSize: 16, marginBottom: 5, fontWeight: "500" }}
      >
        {item.startTime.toLocaleTimeString([], { timeStyle: "short" })}
      </Text>
      <Text
        preset="none"
        style={{
          fontSize: 12,
          color: Colors.subText,
          textAlign: "center",
          width: "100%",
        }}
        text={getEventTime(item.durationInMin * 60000)}
      />
    </Container>
  );
  const MiddleContainer = () => (
    <Container
      style={{
        flexGrow: 1,
        padding: 10,
      }}
    >
      <Text preset="cardTitle">{item.service.name}</Text>
      <Text
        preset={item.status.statusName}
        text={statusDisplayMessages[item.status.statusName]}
      />
    </Container>
  );
  const RightContainer = () => (
    <Container
      style={{
        height: "100%",
        paddingHorizontal: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <View style={{}}>
        <Image
          source={{
            uri: item.clients[0].accountImageUrl,
          }}
          defaultSource={defaultUserImage}
          style={{
            borderRadius: 22.5,
            height: 45,
            width: 45,
            resizeMode: "contain",
          }}
        />
      </View>
      <Text
        preset="textTiny"
        style={{
          color: Colors.subText,
          lineHeight: 0,
          // backgroundColor: "red",
        }}
      >
        {truncated(item.clients[0][item.clients[0].alias], 10) ?? ""}
      </Text>
    </Container>
  );

  return (
    <TouchableOpacity
      onPress={itemPressed}
      style={[
        {
          height: 75,
          borderBottomWidth: 1,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: Colors.white,
          borderBottomColor: Colors.lightGray,
          marginHorizontal: 5,
          borderRadius: BORDER_RADIUS,
        },
      ]}
    >
      <EventServiceColor />
      <LeftContainer />
      <MiddleContainer />
      <RightContainer />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  serviceColor: {
    backgroundColor: "red",
    height: "100%",
    width: 13,
    marginRight: 10,
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
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
});
