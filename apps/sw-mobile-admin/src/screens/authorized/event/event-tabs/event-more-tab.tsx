import { EventDtoType, ServiceDtoType } from "@shortwaits/shared-lib";
import { useTheme } from "../../../../theme";
import React from "react";
import { View, ScrollView, StyleSheet, Platform, Alert } from "react-native";
import { Switch, UrlCard, Text, UrlTypes, Space, ServiceItem, Emoji } from "../../../../components";

export function EventMoreTab({ event }: { event: EventDtoType }) {
  const { Colors } = useTheme();
  // console.log("event", JSON.stringify(event, null, 2));

  const EventLabels = () => {
    if (event?.labels?.length === 0) return null;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
        }}
      >
        <Text preset="none" style={styles.title} text="Labels" />
        {event?.labels?.map(label => {
          return <Emoji size={30} name={label.emojiShortName} />;
        })}
      </View>
    );
  };

  const EventService = () => {
    return (
      <View>
        <Text preset="none" style={styles.title} text="Service" />
        <Space direction="horizontal" size="tiny" />
        <ServiceItem service={item} onPress={_service => {}} style={[styles.withShadow, { alignSelf: "center" }]} />
      </View>
    );
  };

  const EventNotes = () => {
    return (
      <View>
        <Text preset="none" style={styles.title} text="Notes" />
        <Space direction="horizontal" size="tiny" />
        <Text preset="none" style={[styles.notes, styles.withShadow]} text="This are test notes" />
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text preset="none" style={styles.title} text="Repeat" />
        <Switch
          style={{ marginHorizontal: 16 }}
          trackColor={{ false: Colors.red1, true: Colors.backgroundOverlay }}
          thumbColor={isActive ? Colors.brandSecondary2 : Colors.gray}
          ios_backgroundColor={Colors.backgroundOverlay}
          onChange={handleSwitch}
          value={isActive}
        />
      </View>
    );
  };
  const EventGroup = () => {
    const isActive = event.isPublicEvent;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text preset="none" style={styles.title} text="Group" />
        <Switch
          style={{ marginHorizontal: 16 }}
          trackColor={{ false: Colors.red1, true: Colors.brandSecondary1 }}
          thumbColor={isActive ? Colors.brandSecondary2 : Colors.gray}
          ios_backgroundColor={Colors.backgroundOverlay}
          onChange={() => null}
          value={isActive}
        />
      </View>
    );
  };
  const EventFullDay = () => {
    const isActive = event.isPublicEvent;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text preset="none" style={styles.title} text="All day event" />
        <Switch
          style={{ marginHorizontal: 16 }}
          trackColor={{ false: Colors.red1, true: Colors.brandSecondary1 }}
          thumbColor={isActive ? Colors.brandSecondary2 : Colors.gray}
          ios_backgroundColor={Colors.backgroundOverlay}
          onChange={() => null}
          value={isActive}
        />
      </View>
    );
  };

  const EventMeetingUrls = () => {
    return (
      <View>
        <Text preset="none" style={styles.title} text="Meeting Platform" />
        <Space direction="horizontal" size="small" />
        {mock.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <UrlCard key={index} url={item.link} type={item.type as UrlTypes} />
              <Space direction="horizontal" size="small" />
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.backgroundOverlay }}>
      <Space direction="horizontal" size="tiny" />
      <EventService />
      <Space direction="horizontal" size="regular" />
      <EventMeetingUrls />
      <Space direction="horizontal" size="tiny" />
      <EventGroup />
      <Space direction="horizontal" size="regular" />
      <EventRepeat />
      <Space direction="horizontal" size="regular" />
      <EventFullDay />
      <Space direction="horizontal" size="xLarge" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 16,
  },
  notes: {
    padding: 20,
    color: "#666",
    fontSize: 14,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFFF99",
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

const mock = [
  {
    type: "zoom",
    link: "https://zoom.us/j/98596858109",
  },
  // {
  //   type: "google_meet",
  //   link: "https://zoom.us/j/98596858109",
  // },
  // {
  //   type: "custom",
  //   link: "https://zoom.us/j/98596858109",
  // },
  // {
  //   type: "discord",
  //   link: "https://zoom.us/j/98596858109",
  // },
  // {
  //   type: "twitter_space",
  //   link: "https://zoom.us/j/98596858109",
  // },
  // {
  //   type: "facebook_live",
  //   link: "https://zoom.us/j/98596858109",
  // },
  // {
  //   type: "microsoft_teams",
  //   link: "https://zoom.us/j/98596858109",
  // },
  // {
  //   type: "skype",
  //   link: "https://zoom.us/j/98596858109",
  // },
];

const item: ServiceDtoType = {
  _id: "63e756bc6048b02c398bcf7c",
  applicableCategories: ["1ccacea16652f70da4bfc923", "ff1eb8bd6cb17940ab78c0ee", "cea8be18f8249fdbaaa535b0"],
  currency: "USD",
  deleted: false,
  description: "Describe your service here =)",
  durationInMin: 15,
  hours: {
    fri: [
      {
        endTime: 1020,
        isActive: true,
        startTime: 540,
      },
    ],
    mon: [
      {
        endTime: 1020,
        isActive: true,
        startTime: 540,
      },
    ],
    sat: [
      {
        endTime: 1020,
        isActive: true,
        startTime: 540,
      },
    ],
    sun: [
      {
        endTime: 1020,
        isActive: true,
        startTime: 540,
      },
    ],
    thu: [
      {
        endTime: 1020,
        isActive: true,
        startTime: 540,
      },
    ],
    tue: [
      {
        endTime: 1020,
        isActive: true,
        startTime: 540,
      },
    ],
    wed: [
      {
        endTime: 1020,
        isActive: true,
        startTime: 540,
      },
    ],
  },
  imageUrl: "",
  isPrivate: false,
  isVideoConference: false,
  name: "Service I - 15 mins",
  price: 1500,
  serviceColor: {
    colorId: "2",
    colorName: "blue",
    hexCode: "#3d405b",
    isDefault: false,
    isSelected: null,
  },
  staff: [],
  // check this later
  businessId: "",
  createdBy: "",
  updatedBy: "",
};
