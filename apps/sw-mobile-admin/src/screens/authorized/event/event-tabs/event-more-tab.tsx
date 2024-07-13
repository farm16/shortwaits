import { EventDtoType } from "@shortwaits/shared-lib";
import { ActivityIndicator, Messages, ServiceItem, Space, Switch, Text, UrlCard, UrlTypes, getResponsiveHeight, getResponsiveWidth, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useUpdateBusinessEventMutation } from "../../../../services";
import { useBusiness, useService } from "../../../../store";

export function EventMoreTab({ event }: { event: EventDtoType }) {
  const { Colors } = useTheme();
  const business = useBusiness();
  const service = useService(event.serviceId);
  const [updateBusinessEvent, updateEventStatus] = useUpdateBusinessEventMutation();

  const PaymentMethod = () => {
    const paymentMethod = event.paymentMethod || "Cash";
    return (
      <View style={styles.detail}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text preset="textLargeBold" text="Payment method" />
          <Text text={paymentMethod} />
        </View>
      </View>
    );
  };

  const EventLabels = () => {
    const hasLabels = event?.labels?.length > 0;
    return hasLabels ? null : (
      <View style={styles.detail}>
        <Text preset="textLargeBold" text="Labels" />
        <Space size="small" />
        <Messages type={"warning"} message={"This event has no labels"} />
      </View>
    );
  };

  const EventDescription = () => {
    const hasDescription = event?.description;
    return hasDescription ? (
      <View style={styles.detail}>
        <Text preset="textLargeBold" text="Description" />
        <Space size="small" />
        <Text text={event.description} />
      </View>
    ) : (
      <View style={styles.detail}>
        <Text preset="textLargeBold" text="Description" />
        <Space size="small" />
        <Messages type={"warning"} message={"This event has no description"} />
      </View>
    );
  };

  const EventNotes = () => {
    const hasNotes = event?.notes;
    return hasNotes ? (
      <View style={styles.detail}>
        <Text preset="textLargeBold" text="Description" />
        <Space size="small" />
        <Text text={event.notes} />
      </View>
    ) : (
      <View style={styles.detail}>
        <Text preset="textLargeBold" text="Description" />
        <Space size="small" />
        <Messages type={"warning"} message={"This event has no notes"} />
      </View>
    );
  };

  const EventService = () => {
    if (!service) {
      return (
        <View style={styles.detail}>
          <Text preset="textLargeBold" text="Service" />
          <Space size="small" />
          <Messages type={"warning"} message={"This event has no service"} />
        </View>
      );
    }

    return (
      <View style={styles.detail}>
        <Text preset="textLargeBold" text="Service" />
        <Space size="small" />
        <ServiceItem
          disabled
          service={service}
          onPress={_service => {
            console.log("service", _service);
          }}
        />
      </View>
    );
  };

  const EventMeetingUrls = () => {
    return (
      <View style={styles.detail}>
        <Text preset="textLargeBold" text="Meeting Platform" />
        <Space size="small" />
        {event.urls?.length === 0 ? (
          <Messages type={"warning"} message={"This event has no meeting platform"} />
        ) : (
          event.urls.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <UrlCard key={index} url={item.url} type={item.type as UrlTypes} />
                <Space size="small" />
              </React.Fragment>
            );
          })
        )}
      </View>
    );
  };

  const EventPrivacy = () => {
    const isEventPublic = event.isPublicEvent;

    const handleOnChange = () => {
      const formData = {
        ...event,
        isPublicEvent: !isEventPublic,
      };
      updateBusinessEvent({ businessId: business._id, body: formData });
    };

    return (
      <View style={styles.rowDetail}>
        <Text preset="textLargeBold" text="Public event" />
        <Switch
          trackColor={{ false: Colors.red1, true: Colors.brandSecondary1 }}
          thumbColor={isEventPublic ? Colors.brandSecondary2 : Colors.gray}
          ios_backgroundColor={Colors.lightBackground}
          onChange={handleOnChange}
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text preset="textLargeBold" text="Repeat" />
          <Switch
            disabled
            trackColor={{ false: Colors.red1, true: Colors.lightBackground }}
            thumbColor={isActive ? Colors.brandSecondary2 : Colors.gray}
            ios_backgroundColor={Colors.lightBackground}
            onChange={handleSwitch}
            value={isActive}
          />
        </View>
      </View>
    );
  };

  const AttendeeLimit = () => {
    event.attendeeLimit = 0;
    const attendeeLimit = event.attendeeLimit === 0 || event.attendeeLimit === null || event.attendeeLimit === undefined ? "No limit" : event.attendeeLimit.toString();
    return (
      <View style={styles.detail}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text preset="textLargeBold" text="Attendee limit" />
          <Text text={attendeeLimit} />
        </View>
      </View>
    );
  };

  if (updateEventStatus.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: getResponsiveWidth(16),
          // backgroundColor: Colors.background,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Space size="xLarge" />
        <EventNotes />
        <EventDescription />
        <PaymentMethod />
        <EventLabels />
        <EventService />
        <AttendeeLimit />
        <EventRepeat />
        <EventMeetingUrls />
        <EventPrivacy />
        <Space size="xLarge" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    borderBottomColor: "rgb(226,226,226)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    miHeight: getResponsiveHeight(50),
    marginBottom: getResponsiveHeight(16),
    paddingBottom: 16,
  },
  rowDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgb(226,226,226)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: getResponsiveHeight(50),
    marginBottom: getResponsiveHeight(16),
  },
});
