import { EventType } from "@shortwaits/shared-types";
import React from "react";
import { Platform, SectionListData, TextStyle } from "react-native";
import {
  CalendarProvider,
  WeekCalendar,
  ExpandableCalendar,
  AgendaList,
} from "react-native-calendars";

import { Colors } from "../../theme";
import { useCalendarTheme } from "./calendar-hooks";
import { AgendaItem } from "./calendar-item";
import { getMarkedDates } from "./calendar-tools";

type CalendarSectionData = EventType;
type Sections = {
  title: string;
};
export type CalendarEventsType = SectionListData<
  CalendarSectionData,
  Sections
>[];

export const Calendar = (props) => {
  const { events, isWeekView = false } = props;

  const marked = getMarkedDates(events);
  const theme = useCalendarTheme();

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
      {isWeekView ? (
        <WeekCalendar
          markingType={"multi-dot"}
          firstDay={1}
          markedDates={marked}
        />
      ) : (
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
      )}
      <AgendaList
        sections={events}
        renderItem={AgendaItem}
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
    </CalendarProvider>
  );
};
