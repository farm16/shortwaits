import React, { FC, useCallback, useState } from "react";
import {
  Alert,
  Button,
  DefaultSectionT,
  ImageSourcePropType,
  Platform,
  SectionListData,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  ExpandableCalendar,
  CalendarProvider,
  WeekCalendar,
  AgendaList,
} from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Theme } from "react-native-calendars/src/types";
import { isEmpty } from "lodash";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

import {
  AuthorizedScreenHeader,
  Calendar,
  CalendarEventsType,
  FloatingScreenButton,
  Screen,
  SearchBar,
  Space,
} from "../../../components";
import { Colors } from "../../../theme";
import { useGetBusinessQuery } from "../../../services/shortwaits-api";
import {
  AuthorizedScreenProps,
  AUTHORIZED_SCREENS,
  UnauthorizedScreenProps,
} from "../../../navigation";
import { useBusiness, useUser } from "../../../redux";

export const EventsScreen: FC<AuthorizedScreenProps<"events-screen">> = () => {
  const user = useUser();
  const business = useBusiness();
  const threeDotsIcon: ImageSourcePropType =
    Icon.getImageSourceSync("dots-vertical");

  const { isFetching, data: businessPayload } = useGetBusinessQuery(
    business ? business._id : skipToken
  );
  console.log("data payload >>>", businessPayload?.data.services);

  return (
    <Screen
      preset="fixed"
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      <AuthorizedScreenHeader
        title={"Events"}
        iconName2="card-account-details-outline"
        iconName1="plus-thick"
      />
      <Calendar events={SAMPLE_EVENTS} />
    </Screen>
  );
};

const SAMPLE_EVENTS: CalendarEventsType = [
  {
    title: "2022-06-24",
    data: [
      {
        hour: "12am",
        duration: "1h",
        title: "First Yoga",
      },
    ],
  },
  {
    title: "2022-06-25",
    data: [
      {
        hour: "4pm",
        duration: "1h",
        title: "Pilates ABC",
      },
      {
        hour: "5pm",
        duration: "1h",
        title: "Vinyasa Yoga",
      },
    ],
  },
  {
    title: "2022-07-01",
    data: [
      { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
      { hour: "2pm", duration: "1h", title: "Deep Stretches" },
      { hour: "3pm", duration: "1h", title: "Private Yoga" },
    ],
  },
  {
    title: "2022-07-02",
    data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
  },
  {
    title: "2022-07-04",
    data: [{}],
  },
  {
    title: "2022-07-03",
    data: [
      { hour: "9pm", duration: "1h", title: "Middle Yoga" },
      { hour: "10pm", duration: "1h", title: "Ashtanga" },
      { hour: "11pm", duration: "1h", title: "TRX" },
      { hour: "12pm", duration: "1h", title: "Running Group" },
    ],
  },
  {
    title: "2022-07-04",
    data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
  },
  {
    title: "2022-07-06",
    data: [{}],
  },
  {
    title: "2022-07-07",
    data: [
      { hour: "9pm", duration: "1h", title: "Pilates Reformer" },
      { hour: "10pm", duration: "1h", title: "Ashtanga" },
      { hour: "11pm", duration: "1h", title: "TRX" },
      { hour: "12pm", duration: "1h", title: "Running Group" },
    ],
  },
  {
    title: "2022-07-08",
    data: [
      {
        hour: "1pm",
        duration: "1h",
        title: "Ashtanga Yoga",
        description: "",
      },
      { hour: "2pm", duration: "1h", title: "Deep Stretches" },
      { hour: "3pm", duration: "1h", title: "Private Yoga" },
    ],
  },
  {
    title: "2022-07-09",
    data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
  },
];
