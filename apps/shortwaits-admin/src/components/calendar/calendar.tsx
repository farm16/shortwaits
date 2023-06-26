import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Platform, RefreshControl, SectionListData, View } from "react-native";
import { EventType, EventsDtoType } from "@shortwaits/shared-types";
import {
  CalendarProvider,
  ExpandableCalendar,
  AgendaList,
} from "@shortwaits/calendar";

import { Button, NonIdealState } from "..";
import { AuthorizedScreenProps } from "../../navigation";
import { Colors } from "../../theme";
import { useCalendarTheme } from "./calendar-hooks";
import { AgendaItem } from "./calendar-item";
import { Space, Text } from "../common";
import { getAgendaData, getMarkedDates } from "./calendar-utils";
import { useGetEventsByBusinessQuery } from "../../services";
import { useBusiness } from "../../redux";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import { format } from "date-fns";
import { skipToken } from "@reduxjs/toolkit/dist/query";

type CalendarSectionData = EventType;
type Sections = {
  title: string;
};
export type CalendarEventsType = SectionListData<
  CalendarSectionData,
  Sections
>[];

type CalendarProps = {
  isWeekView?: boolean;
};

export const Calendar: FC<CalendarProps> = memo(props => {
  const { isWeekView } = props;

  const theme = useCalendarTheme();
  const business = useBusiness();
  // const { navigate } =
  //   useNavigation<AuthorizedScreenProps<"form-modal-screen">["navigation"]>();

  const {
    data: eventsPayload,
    isLoading: isEventsLoading,
    refetch: refetchEvents,
  } = useGetEventsByBusinessQuery(business._id ?? skipToken);

  const agendaData = useMemo(
    () => getAgendaData(eventsPayload?.data ?? []),
    [eventsPayload?.data]
  );

  // const marked = useRef(getMarkedDates(agendaData));
  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);
  const renderSeparatorItem = useCallback(
    () => <Space size="tiny" direction="horizontal" />,
    []
  );
  const handleRefresh = useCallback(() => {
    if (!isEventsLoading) refetchEvents();
  }, [isEventsLoading, refetchEvents]);

  if (isEventsLoading) {
    return <ActivityIndicator />;
  }

  console.log("rendering calendar");
  console.log("agendaData >>>", JSON.stringify(agendaData, null, 2));

  return (
    <CalendarProvider
      date={agendaData[0]?.title}
      showTodayButton={true}
      todayButtonStyle={{
        backgroundColor: Colors.brandSecondary,
      }}
      theme={{
        todayButtonTextColor: Colors.white,
      }}
    >
      <ExpandableCalendar firstDay={1} theme={theme} />
      <AgendaList
        sections={agendaData}
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
        refreshControl={
          <RefreshControl
            refreshing={isEventsLoading}
            onRefresh={handleRefresh}
          />
        }
        ItemSeparatorComponent={renderSeparatorItem}
        style={{
          backgroundColor: Colors.staticLightBackground,
        }}
      />
    </CalendarProvider>
  );
});
