import { EventDtoType, EventsDtoType } from "@shortwaits/shared-lib";
import { Avatar, NonIdealState, Screen, Space, Text, getResponsiveFontSize, getResponsiveHeight, getUserGreeting, useTheme } from "@shortwaits/shared-ui";
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AuthorizedScreenProps } from "../../../navigation";
import { useUser } from "../../../store";
import { EventItem, EventsTitle, TopTile } from "./helper";

export function HomeScreen({ navigation, route }: AuthorizedScreenProps<"home-screen">) {
  const user = useUser();
  const { Colors } = useTheme();
  const intl = useIntl();

  const userGreeting = getUserGreeting({
    morningMessage: intl.formatMessage({ id: "Common.greeting.morning" }),
    afternoonMessage: intl.formatMessage({ id: "Common.greeting.afternoon" }),
    eveningMessage: intl.formatMessage({ id: "Common.greeting.evening" }),
  });

  const renderEventTitle = useCallback(() => {
    return <EventsTitle />;
  }, []);

  const renderTopTiles = useCallback(() => {
    return (
      <View style={styles.squareContainer}>
        <TopTile
          title="Events"
          subTitle="History"
          onPress={() => {
            navigation.navigate("authorized-tab", {
              screen: "history-screen",
            });
          }}
        />
        <Space size="small" direction="vertical" />
        <TopTile
          title="Favorite"
          subTitle="Places"
          onPress={() => {
            navigation.navigate("authorized-tab", {
              screen: "favorites-screen",
            });
          }}
        />
      </View>
    );
  }, [navigation]);

  const renderEventItem = useCallback((props: ListRenderItemInfo<EventDtoType>) => {
    return <EventItem {...props} />;
  }, []);

  return (
    <Screen backgroundColor="background" unsafeBottom>
      <Space size="large" />
      <View style={styles.greetingContainer}>
        <Text
          text={userGreeting}
          style={[
            styles.greetingText,
            {
              color: Colors.brandSecondary,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("authorized-stack", {
              screen: "user-profile-screen",
            });
          }}
        >
          <Avatar size="small" mode="static" url={user?.accountImageUrl} />
        </TouchableOpacity>
      </View>
      <Space size="large" />
      {renderTopTiles()}
      <Space size="small" />
      <View
        style={[
          styles.bottomContainer,
          {
            backgroundColor: Colors.lightBackground,
          },
        ]}
      >
        <View style={styles.eventContainer}>
          {renderEventTitle()}
          <Space />
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return <NonIdealState type="noEvents" />;
            }}
            data={mockData}
            ItemSeparatorComponent={() => {
              return <Space size="tiny" />;
            }}
            ListFooterComponent={() => {
              return <Space size="large" />;
            }}
            renderItem={renderEventItem}
          />
        </View>
      </View>
    </Screen>
  );
}

const mockData: EventsDtoType = [
  {
    _id: "6594ec9b9a070fe56e0b19f9",
    //  todo: add category
    expectedEndTime: "2024-01-03T05:26:46.896Z",
    registrationDeadlineTime: "",
    paymentMethod: "CASH",
    participantsIds: [],
    leadClientId: "",
    urls: [],
    location: {
      address: "",
      latitude: 0,
      longitude: 0,
    },
    attendeeLimit: 0,
    registrationFee: 0,
    serviceId: "6593dd6646e04cf8fe017035",
    staffIds: ["6593dd6646e04cf8fe017032"],
    localClientsIds: [],
    clientsIds: [],
    hasDuration: true,
    eventImage: "",
    businessId: "6593dd6646e04cf8fe017034",
    name: "sadads",
    description: "",
    createdBy: "6593dd6646e04cf8fe017032",
    updatedBy: "6593dd6646e04cf8fe017032",
    features: [],
    status: {
      statusCode: 0,
      statusName: "CANCELED",
    },
    durationInMin: 15,
    startTime: "2024-01-03T05:11:46.896Z",
    endTime: null,
    priceExpected: 1500,
    priceFinal: 1500,
    canceled: false,
    cancellationReason: "",
    isPublicEvent: true,
    repeat: true,
    payment: null,
    notes: "",
    labels: [],
    deleted: false,
    createdAt: "2024-01-03T05:11:55.534Z",
    updatedAt: "2024-01-03T05:11:55.538Z",
    discountAmount: 0,
    availableDiscountCodes: [],
    selectedDiscountCode: null,
  },
  {
    _id: "6594ec9b9a070fe56e0b19f9",
    //  todo: add category
    expectedEndTime: "2024-01-03T05:26:46.896Z",
    registrationDeadlineTime: "",
    paymentMethod: "CASH",
    participantsIds: [],
    leadClientId: "",
    urls: [],
    location: {
      address: "",
      latitude: 0,
      longitude: 0,
    },
    attendeeLimit: 0,
    registrationFee: 0,
    serviceId: "6593dd6646e04cf8fe017035",
    staffIds: ["6593dd6646e04cf8fe017032"],
    localClientsIds: [],
    clientsIds: [],
    hasDuration: true,
    eventImage: "",
    businessId: "6593dd6646e04cf8fe017034",
    name: "sadads",
    description: "",
    createdBy: "6593dd6646e04cf8fe017032",
    updatedBy: "6593dd6646e04cf8fe017032",
    features: [],
    status: {
      statusCode: 0,
      statusName: "CANCELED",
    },
    durationInMin: 15,
    startTime: "2024-01-03T05:11:46.896Z",
    endTime: null,
    priceExpected: 1500,
    discountAmount: 0,
    availableDiscountCodes: [],
    selectedDiscountCode: null,
    priceFinal: 1500,
    canceled: false,
    cancellationReason: "",
    isPublicEvent: true,
    repeat: true,
    payment: null,
    notes: "",
    labels: [],
    deleted: false,
    createdAt: "2024-01-03T05:11:55.534Z",
    updatedAt: "2024-01-03T05:11:55.538Z",
  },
  {
    _id: "6594ec9b9a070fe56e0b19f9",
    //  todo: add category
    expectedEndTime: "2024-01-03T05:26:46.896Z",
    registrationDeadlineTime: "",
    paymentMethod: "CASH",
    participantsIds: [],
    leadClientId: "",
    urls: [],
    location: {
      address: "",
      latitude: 0,
      longitude: 0,
    },
    attendeeLimit: 0,
    registrationFee: 0,
    serviceId: "6593dd6646e04cf8fe017035",
    staffIds: ["6593dd6646e04cf8fe017032"],
    localClientsIds: [],
    clientsIds: [],
    hasDuration: true,
    eventImage: "",
    businessId: "6593dd6646e04cf8fe017034",
    name: "sadads",
    description: "",
    createdBy: "6593dd6646e04cf8fe017032",
    updatedBy: "6593dd6646e04cf8fe017032",
    features: [],
    status: {
      statusCode: 0,
      statusName: "CANCELED",
    },
    durationInMin: 15,
    startTime: "2024-01-03T05:11:46.896Z",
    endTime: null,
    priceExpected: 1500,
    priceFinal: 1500,
    canceled: false,
    cancellationReason: "",
    isPublicEvent: true,
    repeat: true,
    payment: null,
    notes: "",
    labels: [],
    deleted: false,
    createdAt: "2024-01-03T05:11:55.534Z",
    updatedAt: "2024-01-03T05:11:55.538Z",
    discountAmount: 0,
    availableDiscountCodes: [],
    selectedDiscountCode: null,
  },
  {
    _id: "6594ec9b9a070fe56e0b19f9",
    //  todo: add category
    expectedEndTime: "2024-01-03T05:26:46.896Z",
    registrationDeadlineTime: "",
    paymentMethod: "CASH",
    participantsIds: [],
    leadClientId: "",
    urls: [],
    location: {
      address: "",
      latitude: 0,
      longitude: 0,
    },
    attendeeLimit: 0,
    registrationFee: 0,
    serviceId: "6593dd6646e04cf8fe017035",
    staffIds: ["6593dd6646e04cf8fe017032"],
    localClientsIds: [],
    clientsIds: [],
    hasDuration: true,
    eventImage: "",
    businessId: "6593dd6646e04cf8fe017034",
    name: "sadads",
    description: "",
    createdBy: "6593dd6646e04cf8fe017032",
    updatedBy: "6593dd6646e04cf8fe017032",
    features: [],
    status: {
      statusCode: 0,
      statusName: "CANCELED",
    },
    durationInMin: 15,
    startTime: "2024-01-03T05:11:46.896Z",
    endTime: null,
    priceExpected: 1500,
    priceFinal: 1500,
    canceled: false,
    cancellationReason: "",
    isPublicEvent: true,
    repeat: true,
    payment: null,
    notes: "",
    labels: [],
    deleted: false,
    createdAt: "2024-01-03T05:11:55.534Z",
    updatedAt: "2024-01-03T05:11:55.538Z",
    discountAmount: 0,
    availableDiscountCodes: [],
    selectedDiscountCode: null,
  },
];

const styles = StyleSheet.create({
  eventTitleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  eventTitle: {
    fontSize: getResponsiveFontSize(21),
    fontWeight: "700",
    textTransform: "uppercase",
  },
  bottomContainer: {
    flex: 1,
    paddingTop: getResponsiveHeight(41),
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  eventContainer: {
    // paddingHorizontal: 16,
    flex: 1,
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  greetingText: {
    fontSize: getResponsiveHeight(21),
    fontWeight: "700",
  },
  squareContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  square: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "blue",
    height: getResponsiveHeight(100),
    borderRadius: 15,
  },
  squareIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: getResponsiveHeight(30) / 2,
    height: getResponsiveHeight(30),
    width: getResponsiveHeight(30),
    justifyContent: "center",
    alignItems: "center",
  },
});
