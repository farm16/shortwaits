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
import { date } from "yup";

import {
  AuthorizedScreenHeader,
  FloatingScreenButton,
  Screen,
  SearchBar,
  Space,
} from "../../../components";
import { Colors } from "../../../theme/Variables";
import { useGetBusinessQuery } from "../../../services/shortwaits-api";
import { useUser } from "../../../redux/hooks/useUser";
import {
  AuthorizedScreenProps,
  AUTHORIZED_SCREENS,
  UnauthorizedScreenProps,
} from "../../../navigation";

function getFutureDates(numberOfDays: number) {
  const array: string[] = [];
  for (let index = 1; index <= numberOfDays; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split("T")[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split("T")[0];
}

const today = new Date().toISOString().split("T")[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

console.log("dates >>>", dates);

type MarkedDates = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: object;
};
function getMarkedDates(items: any[]) {
  const marked: MarkedDates = {};
  const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
  const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
  const workout = { key: "workout", color: "green" };
  items.forEach((item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = {
        dots: [vacation, massage, workout],
        selected: false,
        selectedColor: "orange",
      };
    } else {
      marked[item.title] = { disabled: true };
    }
  });
  return marked;
}

function getTheme(): Theme {
  return {
    // arrows
    arrowStyle: { padding: 0 },
    // knob
    // expandableKnobColor: Colors.brandSecondary,
    // month
    textMonthFontSize: 16,
    // textMonthFontFamily: "HelveticaNeue",
    textMonthFontWeight: "bold" as const,
    // day names
    textDayHeaderFontSize: 12,
    // textDayHeaderFontFamily: "HelveticaNeue",
    textDayHeaderFontWeight: "normal" as const,
    // dates
    // dayTextColor: Colors.brandSecondary,
    textDayFontSize: 18,
    // textDayFontFamily: "HelveticaNeue",
    textDayFontWeight: "500" as const,
    textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
    // selected date
    // selectedDayBackgroundColor: Colors.white,
    // disabled date
    textDisabledColor: Colors.lightGray,
    // dot (marked date)
    // dotColor: Colors.brandSecondary,
    // textSectionTitleColor: "white",
    // selectedDotColor: "white",
    textInactiveColor: Colors.lightGray,
    textSecondaryColor: Colors.lightGray,
    textDefaultColor: Colors.lightGray,
    agendaDayTextColor: Colors.gray,
    disabledDotColor: Colors.white,
    dotStyle: {
      marginTop: -2,
    },
    monthTextColor: Colors.brandAccent,
    dayTextColor: Colors.brandAccent,
    arrowColor: Colors.brandAccent,
    textColor: Colors.brandAccent,
    // selectedDayTextColor: Colors.brandAccent2,
    calendarBackground: Colors.white,
  };
}
export const EventsScreen: FC<AuthorizedScreenProps<"events-screen">> = () => {
  const user = useUser();
  const threeDotsIcon: ImageSourcePropType =
    Icon.getImageSourceSync("dots-vertical");

  const { isFetching, data: businessPayload } = useGetBusinessQuery(
    user?.businesses[0]
  );
  console.log("data payload >>>", businessPayload?.data.services);

  const EVENTS: SectionListData<any, DefaultSectionT>[] = [
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
        { hour: "4pm", duration: "1h", title: "Pilates ABC" },
        { hour: "5pm", duration: "1h", title: "Vinyasa Yoga" },
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

  const marked = getMarkedDates(EVENTS);
  const theme = getTheme();

  const onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  const isWeekView = false;
  const renderItem = ({ item }: any) => {
    return <AgendaItem item={item} />;
  };

  // console.log("marked>>>", JSON.stringify(marked, null, 3))

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
      <CalendarProvider
        date={new Date(Date.now()).toISOString()}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.5}
        todayButtonStyle={{
          height: 55,
          borderRadius: 25,
          backgroundColor: Colors.brandSecondary,
          // width: 65,
          // height: 65,
          // borderRadius: 40
        }}
        theme={{
          todayButtonTextColor: Colors.white,
        }}
        style={{ flex: 1 }}
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
            theme={theme}
            firstDay={1}
            disableArrowLeft
            // renderArrow={_direction => null}
            // renderHeader={_date => null}
            markedDates={marked}
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
          style={{ flex: 1 }}
          sections={EVENTS}
          renderItem={renderItem}
          scrollToNextEvent
          sectionStyle={styles.section}
          // dayFormat={'YYYY-MM-d'}
        />
      </CalendarProvider>
      {/* <FloatingScreenButton iconName="plus" /> */}
    </Screen>
  );
};

interface ItemProps {
  item: any;
}

const AgendaItem = React.memo(function AgendaItem(props: ItemProps) {
  const { item } = props;

  const buttonPressed = useCallback(() => {
    Alert.alert("Show me more");
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, [item.title]);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
        <Button color={"grey"} title={"Info"} onPress={buttonPressed} />
      </View>
    </TouchableOpacity>
  );
});

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
