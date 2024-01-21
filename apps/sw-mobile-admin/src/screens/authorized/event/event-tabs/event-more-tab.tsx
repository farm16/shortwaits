import { Messages, ServiceItem, Space, Switch, Text, UrlCard, UrlTypes, useTheme } from "@shortwaits/shared-ui";
import { EventDtoType } from "@shortwaits/shared-utils";
import React from "react";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useService } from "../../../../store";

export function EventMoreTab({ event }: { event: EventDtoType }) {
  const { Colors } = useTheme();
  const service = useService(event.serviceId);

  const PaymentMethod = () => {
    const paymentMethod = event.paymentMethod || "Cash";
    return (
      <View style={styles.detail}>
        <Text preset="none" style={styles.title} text="Payment method" />
        <Text text={paymentMethod} />
      </View>
    );
  };

  const EventLabels = () => {
    const hasLabels = event?.labels?.length > 0;
    return hasLabels ? null : (
      <View style={styles.detail}>
        <Text preset="none" style={styles.title} text="Labels" />
        <Messages type={"warning"} message={"This event has no labels"} />
      </View>
    );
  };

  const EventDescription = () => {
    const hasDescription = event?.description;
    return hasDescription ? null : (
      <View style={styles.detail}>
        <Text preset="none" style={styles.title} text="Description" />
        <Messages type={"warning"} message={"This event has no description"} />
      </View>
    );
  };

  const EventNotes = () => {
    if (!event.notes) {
      return (
        <View style={styles.detail}>
          <Text preset="none" style={styles.title} text="Notes" />
          <Messages type={"warning"} message={"This event has no Notes"} />
        </View>
      );
    }

    return (
      <View>
        <Text preset="none" style={styles.title} text="Notes" />
        <Space direction="horizontal" size="tiny" />
        <View style={styles.notes}>
          <Text preset="none" style={{ color: Colors.text, fontWeight: "600" }} text={event.notes} />
        </View>
        <Space />
      </View>
    );
  };

  const EventService = () => {
    if (!service) {
      return (
        <View style={styles.detail}>
          <Text preset="none" style={styles.title} text="Service" />
          <Messages
            style={{
              marginLeft: 16,
            }}
            type={"warning"}
            message={"This event has no service"}
          />
        </View>
      );
    }

    return (
      <View>
        <Text preset="none" style={styles.title} text="Service" />
        <Space direction="horizontal" size="tiny" />
        <ServiceItem
          service={service}
          onPress={_service => {
            console.log("service", _service);
          }}
          style={[styles.withShadow, { alignSelf: "center" }]}
        />
        <Space />
      </View>
    );
  };

  const EventMeetingUrls = () => {
    return (
      <View>
        <Text preset="none" style={styles.title} text="Meeting Platform" />
        <Space direction="horizontal" size="small" />
        {event.urls?.length === 0 ? (
          <Messages
            style={{
              marginLeft: 16,
            }}
            type={"warning"}
            message={"This event has no meeting platform"}
          />
        ) : (
          event.urls.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <UrlCard key={index} url={item.url} type={item.type as UrlTypes} />
                <Space direction="horizontal" size="small" />
              </React.Fragment>
            );
          })
        )}
        <Space />
      </View>
    );
  };

  const EventPrivacy = () => {
    const isEventPublic = event.isPublicEvent;
    return (
      <View style={styles.detail}>
        <Text preset="none" style={styles.title} text="Public event" />
        <Switch
          trackColor={{ false: Colors.red1, true: Colors.brandSecondary1 }}
          thumbColor={isEventPublic ? Colors.brandSecondary2 : Colors.gray}
          ios_backgroundColor={Colors.lightBackground}
          onChange={() => null}
          value={isEventPublic}
        />
      </View>
    );
  };

  const EventRepeat = () => {
    let isActive = event.isPublicEvent;
    if (event.clientsIds?.length > 0) isActive = false;

    const handleSwitch = () => {
      if (event.clientsIds?.length > 0) {
        Alert.alert("You can't change this option", "This event has clients assigned to it");
      }
    };

    return (
      <View style={styles.detail}>
        <Text preset="none" style={styles.title} text="Repeat" />
        <Switch
          disabled
          trackColor={{ false: Colors.red1, true: Colors.lightBackground }}
          thumbColor={isActive ? Colors.brandSecondary2 : Colors.gray}
          ios_backgroundColor={Colors.lightBackground}
          onChange={handleSwitch}
          value={isActive}
        />
      </View>
    );
  };

  const AttendeeLimit = () => {
    event.attendeeLimit = 0;
    const attendeeLimit = event.attendeeLimit === 0 || event.attendeeLimit === null || event.attendeeLimit === undefined ? "No limit" : event.attendeeLimit.toString();
    return (
      <View style={styles.detail}>
        <Text preset="none" style={styles.title} text="Attendee limit" />
        <Text text={attendeeLimit} />
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: Colors.lightBackground }}>
      <Space size="large" />
      <EventNotes />

      <EventDescription />

      <PaymentMethod />

      <EventLabels />

      <EventService />

      <EventMeetingUrls />

      <EventPrivacy />

      <EventRepeat />

      <AttendeeLimit />
      <Space size="large" />
      <Space size="large" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  notes: {
    padding: 20,
    color: "#666",

    fontSize: 14,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "yellow", // color of a yellow notepad background
    borderRadius: 8,
  },
  withShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
