import { EventType } from "@shortwaits/shared-types";
import React from "react";
import {
  DefaultSectionT,
  SectionListData,
  StyleSheet,
  TextStyle,
} from "react-native";
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
import { Text } from "../common";

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

  const onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  const renderItem = ({ item }) => {
    return <AgendaItem item={item} />;
  };

  // console.log("marked>>>", JSON.stringify(marked, null, 3))
  return (
    <CalendarProvider
      date={new Date(Date.now()).toISOString()}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton={true}
      todayButtonStyle={{
        backgroundColor: Colors.brandSecondary6,
      }}
      theme={{
        todayButtonTextColor: "white",
      }}
      //   disabledOpacity={0.5}
      //   todayBottomMargin={30}
      //   todayButtonStyle
      // theme={theme}
      //   style={{ flex: 1 }}
      //todayBottomMargin={16}
    >
      {isWeekView ? (
        <WeekCalendar
          markingType={"multi-dot"}
          firstDay={1}
          markedDates={marked}
        />
      ) : (
        <ExpandableCalendar
          // @to-do !!!!
          // markedDates={marked}
          // markingType={"multi-dot"}
          firstDay={1}
          theme={{
            arrowColor: Colors.brandSecondary6,
            selectedDayBackgroundColor: Colors.brandSecondary3,
            todayBackgroundColor: Colors.brandSecondary6,
            todayButtonTextColor: Colors.white,
            todayTextColor: Colors.white,
            dayTextColor: Colors.subText,

            textDayStyle: {
              color: Colors.text,
            },
            selectedDayTextColor: Colors.white,
          }}
          style={{
            shadowColor: "#858F96",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            shadowOffset: { height: 10, width: 0 },
            zIndex: 99,
          }}
          allowShadow={false}
          // renderArrow={_direction => null}
          // renderHeader={_date => null}
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.calendar} // for horizontal only
          // disableWeekScroll
          // disableAllTouchEventsForDisabledDays
          // leftArrowImageSource={leftArrowIcon}
          // rightArrowImageSource={rightArrowIcon}
          // animateScroll
        />
      )}
      <AgendaList
        sections={events}
        renderItem={renderItem}
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
            // textAlign: "right",
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
          } as TextStyle
        }
        // scrollToNextEvent
        // dayFormat={'YYYY-MM-d'}
      />
    </CalendarProvider>
  );
};
