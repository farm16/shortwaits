import React, { FC, useEffect, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { ActivityIndicator } from "react-native-paper";

import {
  Calendar,
  FloatingActionButton,
  Screen,
  getCalendarData,
  Text,
  CircleIconButton,
  FloatingActions,
} from "../../../components";
import { Colors } from "../../../theme";
import {
  useGetAllBusinessEventsQuery,
  useGetServicesByBusinessQuery,
} from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";
import { useBusiness } from "../../../redux";
import { View, ViewStyle } from "react-native";
import { truncate } from "lodash";

export const EventsScreen: FC<AuthorizedScreenProps<"events-screen">> = ({
  navigation,
}) => {
  const business = useBusiness();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text text={truncate(business.shortName, { length: 16 })} />
            <CircleIconButton
              style={{
                marginLeft: 15,
              }}
              iconType="business"
            />
          </View>
        );
      },
      headerShadowVisible: false,
    });
  }, [business.shortName, navigation]);

  const { isSuccess: isBusinessServicesSuccess } =
    useGetServicesByBusinessQuery(business ? business._id : skipToken);
  const {
    data: eventsData,
    isLoading: isEventsLoading,
    isSuccess: isEventSuccess,
  } = useGetAllBusinessEventsQuery(
    business && isBusinessServicesSuccess ? business._id : skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const events = useMemo(
    () => getCalendarData(eventsData?.data.events),
    [eventsData]
  );
  const actions: FloatingActions = [
    {
      label: "EVENTS",
      onPress: () => null,
      icon: "calendar-clock",
      color: Colors.white,
      labelTextColor: Colors.white,
      style: {
        backgroundColor: Colors.brandSecondary,
      },
      labelStyle: {
        backgroundColor: Colors.brandSecondary,
        borderRadius: 20,
      },
    },
    {
      label: "CLIENTS",
      onPress: () => null,
      icon: "account-group",
      color: Colors.white,
      labelTextColor: Colors.white,
      style: {
        backgroundColor: Colors.brandSecondary,
      },
      labelStyle: {
        backgroundColor: Colors.brandSecondary,
        borderRadius: 20,
      },
    },
    {
      label: "STAFF",
      color: Colors.white,
      labelTextColor: Colors.white,
      onPress: () => null,
      icon: "account-tie",
      style: {
        backgroundColor: Colors.brandSecondary,
      },
      labelStyle: {
        backgroundColor: Colors.brandSecondary,
        borderRadius: 20,
      },
    },
    {
      label: "MORE",
      onPress: () => null,
      icon: "dots-horizontal",
      color: Colors.white,
      labelTextColor: Colors.white,
      style: {
        backgroundColor: Colors.brandSecondary,
      },
      labelStyle: {
        backgroundColor: Colors.brandSecondary,
        borderRadius: 20,
      },
    },
  ];
  return (
    <Screen
      preset="fixed"
      unsafe
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      {isEventsLoading && !isEventSuccess ? (
        <ActivityIndicator />
      ) : (
        <Calendar events={events} />
      )}
      <FloatingActionButton
        actions={actions}
        icon={"plus"}
        pressedIcon={"close"}
      />
    </Screen>
  );
};
