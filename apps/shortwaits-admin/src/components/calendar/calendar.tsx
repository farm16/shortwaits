import React from "react";
import { DefaultSectionT, SectionListData, StyleSheet } from "react-native";
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

export type CalendarEventsType = SectionListData<
  {
    hour: string;
    duration: string;
    title: string;
  },
  DefaultSectionT
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
      //   disabledOpacity={0.5}
      //   todayBottomMargin={30}
      //   todayButtonStyle
      theme={{
        todayBackgroundColor: Colors.brandSecondary,
        todayButtonFontSize: 15,
      }}
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
          //   theme={theme}
          markedDates={marked}
          firstDay={1}
          markingType={"multi-dot"}
          style={{
            backgroundColor: Colors.brandAccent,
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
        // scrollToNextEvent
        // dayFormat={'YYYY-MM-d'}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: "white",
    color: "grey",
    textTransform: "capitalize",
  },
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});
