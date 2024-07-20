import { EventDtoType } from "@shortwaits/shared-lib";
import { AnimatedSearchBar, Avatar, IconButton, NonIdealState, Screen, Space, getResponsiveFontSize, getResponsiveHeight, getUserGreeting } from "@shortwaits/shared-ui";
import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { ListRenderItemInfo, RefreshControl, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FloatingActionButton } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useGetEventsDetailsForClientQuery } from "../../../services";
import { useUser } from "../../../store";
import { EventItem, HomeScreenTitle, TopTile } from "./helper";

export function HomeScreen({ navigation, route }: AuthorizedScreenProps<"home-screen">) {
  const user = useUser();
  const intl = useIntl();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const {
    data: eventsDetails,
    error: eventsDetailsError,
    isLoading: eventsDetailsIsLoading,
    isFetching: eventsDetailsIsFetching,
    refetch,
  } = useGetEventsDetailsForClientQuery(undefined);
  console.log("eventsDetails HOME SCREEN >>>", eventsDetails);

  const userGreeting = getUserGreeting({
    morningMessage: intl.formatMessage({ id: "Common.greeting.morning" }),
    afternoonMessage: intl.formatMessage({ id: "Common.greeting.afternoon" }),
    eveningMessage: intl.formatMessage({ id: "Common.greeting.evening" }),
  });

  const renderTopTiles = useCallback(() => {
    return (
      <View style={styles.squareContainer}>
        <TopTile
          title="Event"
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
            refreshControl={<RefreshControl refreshing={eventsDetailsIsFetching} onRefresh={refetch} tintColor="black" />}
            onRefresh={refetch}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return <NonIdealState type="noEvents" />;
            }}
            data={eventsDetails?.data ?? []}
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
