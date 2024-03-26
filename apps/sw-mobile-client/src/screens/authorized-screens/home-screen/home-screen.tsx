import { EventDtoType, EventsDtoType } from "@shortwaits/shared-lib";
import { AnimatedSearchBar, Avatar, IconButton, NonIdealState, Screen, Space, getResponsiveFontSize, getResponsiveHeight, getUserGreeting } from "@shortwaits/shared-ui";
import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FloatingActionButton } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useUser } from "../../../store";
import { EventItem, HomeScreenTitle, TopTile } from "./helper";

export function HomeScreen({ navigation, route }: AuthorizedScreenProps<"home-screen">) {
  const user = useUser();
  const intl = useIntl();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const userGreeting = getUserGreeting({
    morningMessage: intl.formatMessage({ id: "Common.greeting.morning" }),
    afternoonMessage: intl.formatMessage({ id: "Common.greeting.afternoon" }),
    eveningMessage: intl.formatMessage({ id: "Common.greeting.evening" }),
  });

  const renderTopTiles = useCallback(() => {
    return (
      <View style={styles.squareContainer}>
        <TopTile
          title="Events"
          subTitle="History"
          imageUrl="https://images.unsplash.com/photo-1593702288056-7927b442d0fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          imageUrl="https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

  const renderLeftIcons = useCallback(() => {
    return <IconButton iconType="search" iconColor="black" onPress={() => setIsSearchBarVisible(!isSearchBarVisible)} />;
  }, [isSearchBarVisible]);

  const renderProfileIcon = useCallback(() => {
    return (
      <Avatar
        size="small"
        mode="button"
        url={user?.accountImageUrl}
        onPress={() => {
          navigation.navigate("authorized-stack", {
            screen: "user-profile-screen",
          });
        }}
      />
    );
  }, [navigation, user?.accountImageUrl]);

  const displayName = user.displayName || user.familyName || user.givenName || user.email;

  return (
    <Screen backgroundColor="background" unsafeBottom withHorizontalPadding>
      <Space size="large" />
      <View style={styles.greetingContainer}>
        <HomeScreenTitle title={displayName} subTitle={userGreeting} renderLeftComponent={renderProfileIcon} />
      </View>
      <Space size="large" />
      {renderTopTiles()}
      <Space size="large" />
      <View style={[styles.bottomContainer]}>
        <View style={styles.eventContainer}>
          <HomeScreenTitle title="Upcoming events" renderLeftComponent={renderLeftIcons} />
          <AnimatedSearchBar
            isVisible={isSearchBarVisible}
            onChangeText={txt => {
              console.log(txt);
            }}
          />
          <Space />
          <FlatList
            contentContainerStyle={{}}
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
      <FloatingActionButton />
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
      name: "Example Location",
      address: "123 Main Street",
      city: "Cityville",
      state: "Stateville",
      country: "Countryland",
      postalCode: "12345",
      latitude: 40.7128,
      longitude: -74.006,
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
    name: "sample event",
    description: "this is a sample event",
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
      name: "Example Location",
      address: "123 Main Street",
      city: "Cityville",
      state: "Stateville",
      country: "Countryland",
      postalCode: "12345",
      latitude: 40.7128,
      longitude: -74.006,
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
    endTime: "2024-01-03T05:12:46.896Z",
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
      name: "Example Location",
      address: "123 Main Street",
      city: "Cityville",
      state: "Stateville",
      country: "Countryland",
      postalCode: "12345",
      latitude: 40.7128,
      longitude: -74.006,
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
      name: "Example Location",
      address: "123 Main Street",
      city: "Cityville",
      state: "Stateville",
      country: "Countryland",
      postalCode: "12345",
      latitude: 40.7128,
      longitude: -74.006,
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

    alignItems: "center",
  },
  greetingText: {
    fontSize: getResponsiveHeight(21),
    fontWeight: "700",
  },
  squareContainer: {
    flexDirection: "row",
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
