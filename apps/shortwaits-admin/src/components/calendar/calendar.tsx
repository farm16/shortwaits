import React, { FC, memo, useMemo, useState } from "react";
import {
  Platform,
  RefreshControl,
  SectionListData,
  TextStyle,
} from "react-native";
import { EventType } from "@shortwaits/shared-types";
import {
  CalendarProvider,
  ExpandableCalendar,
  AgendaList,
} from "react-native-calendars";

import { Button, NonIdealState } from "..";
import { AuthorizedScreenProps } from "../../navigation";
import { Colors } from "../../theme";
import { useCalendarTheme } from "./calendar-hooks";
import { AgendaItem } from "./calendar-item";
import { getCalendarItems } from "./calendar-utils";
import { useGetEventsByBusinessQuery } from "../../services";
import { useBusiness } from "../../redux";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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
  // navigation?: AuthorizedScreenProps<"form-modal-screen">["navigation"];
};

export const Calendar: FC<CalendarProps> = memo(props => {
  const theme = useCalendarTheme();
  const business = useBusiness();
  const { navigate } =
    useNavigation<AuthorizedScreenProps<"form-modal-screen">["navigation"]>();

  const {
    data: eventsPayload,
    isLoading: isEventsLoading,
    refetch: refetchEvents,
  } = useGetEventsByBusinessQuery(business._id);

  // const marked = getMarkedDates(eventsPayload.data ?? []);
  const items = getCalendarItems(eventsPayload?.data ?? []);

  const handleRefresh = () => {
    refetchEvents();
  };

  if (isEventsLoading) {
    return <ActivityIndicator />;
  }

  return (
    <CalendarProvider
      date={new Date(Date.now()).toISOString()}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton={true}
      todayButtonStyle={{
        backgroundColor: Colors.brandSecondary,
      }}
      theme={{
        todayButtonTextColor: Colors.white,
      }}
    >
      <ExpandableCalendar
        /**
         * @todo !!!
         * markedDates={marked}
         * markingType={"multi-dot"}
         **/
        firstDay={1}
        theme={theme}
        style={{
          ...Platform.select({
            ios: {
              shadowColor: "#858F96",
              shadowOpacity: 0.25,
              shadowRadius: 10,
              shadowOffset: { height: 2, width: 0 },
              zIndex: 99,
            },
            android: {
              elevation: 3,
            },
          }),
        }}
        allowShadow={false}
      />
      {eventsPayload.data.length === 0 ? (
        <NonIdealState
          image={"noEvents"}
          buttons={[
            <Button
              text="Add Event"
              onPress={() =>
                navigate("modals", {
                  screen: "form-modal-screen",
                  params: {
                    form: "addEvent",
                    onDone: () => {
                      handleRefresh();
                    },
                  },
                })
              }
            />,
          ]}
        />
      ) : (
        <AgendaList
          sections={items}
          renderItem={AgendaItem}
          refreshControl={
            <RefreshControl
              refreshing={isEventsLoading}
              onRefresh={handleRefresh}
            />
          }
          style={{
            backgroundColor: Colors.staticLightBackground,
          }}
          sectionStyle={
            {
              backgroundColor: Colors.staticLightBackground,
              color: Colors.gray,
              fontWeight: "400",
              fontSize: 13,
              lineHeight: undefined,
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
            } as TextStyle
          }
        />
      )}
    </CalendarProvider>
  );
});
