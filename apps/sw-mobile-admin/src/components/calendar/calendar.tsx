import { EventType } from "@shortwaits/shared-lib";
import React, { FC, memo, useCallback } from "react";
import { RefreshControl, SectionListData, View } from "react-native";
import { AgendaList, CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useIntl } from "react-intl";
import { ActivityIndicator } from "react-native-paper";
import { useGetEventsByBusinessQuery } from "../../services";
import { useBusiness, useEvents } from "../../store";
import { Colors } from "../../theme";
import { getResponsiveHeight, navigate } from "../../utils";
import { Button, Space } from "../common";
import { NonIdealState } from "../non-ideal-state/non-ideal-state";
import { useCalendarTheme } from "./calendar-hooks";
import { AgendaItem } from "./calendar-item";
import { LocaleConfig } from "./calendar-locales";
import { useAgendaData, useClosestDateFromAgendaData } from "./calendar-utils";

type CalendarSectionData = EventType;
type Sections = {
  title: string;
};
export type CalendarEventsType = SectionListData<CalendarSectionData, Sections>[];

type CalendarProps = {
  isWeekView?: boolean;
};

export const Calendar: FC<CalendarProps> = memo(props => {
  const { isWeekView } = props;

  const theme = useCalendarTheme();
  const currentBusiness = useBusiness();
  const currentEvents = useEvents();
  const agendaData = useAgendaData(currentEvents ?? []);
  const intl = useIntl();

  const locale = intl.locale || "en";

  LocaleConfig.defaultLocale = locale;

  const [limit, setLimit] = React.useState(100);

  const {
    isLoading: isEventsLoading,
    isError: isEventsError,
    refetch: refetchEvents,
  } = useGetEventsByBusinessQuery(
    {
      businessId: currentBusiness._id,
      query: {
        limit,
      },
    } ?? skipToken
  );

  const renderItem = useCallback(({ item, index }) => {
    const triggerTick = index === 0;
    return <AgendaItem item={item} triggerTick={triggerTick} />;
  }, []);
  const renderSeparatorItem = useCallback(() => <Space size="tiny" direction="horizontal" />, []);
  const handleRefresh = useCallback(() => {
    if (!isEventsLoading) refetchEvents();
  }, [isEventsLoading, refetchEvents]);
  const renderNonIdealState = useCallback(() => {
    return (
      <View
        style={{
          marginTop: getResponsiveHeight(16),
          marginHorizontal: getResponsiveHeight(32),
        }}
      >
        <NonIdealState
          type={"noEvents"}
          buttons={
            <Button
              text={intl.formatMessage({ id: "Events_Screen.nonIdealState.button" })}
              onPress={() => {
                navigate("modals", {
                  screen: "add-event-modal-screen",
                  params: {
                    onDone: () => {
                      if (!isEventsLoading) {
                        refetchEvents();
                      }
                    },
                  },
                });
              }}
            />
          }
        />
      </View>
    );
  }, [intl, isEventsLoading, refetchEvents]);

  const initialDate = useClosestDateFromAgendaData(agendaData);

  if (isEventsLoading) {
    return <ActivityIndicator />;
  }

  console.log("initialDate", initialDate);
  console.log("agendaData", agendaData);

  return (
    <CalendarProvider
      theme={{
        calendarBackground: Colors.white,
        backgroundColor: Colors.white,
        todayTextColor: Colors.text,
        dayTextColor: Colors.text,
        todayButtonTextColor: Colors.text,
      }}
      date={initialDate}
      showTodayButton={true}
    >
      <ExpandableCalendar
        firstDay={1}
        theme={{
          selectedDayBackgroundColor: "#333248",
        }}
        hideArrows={false}
        renderArrow={direction => {
          return <Icon name={`chevron-${direction}`} size={24} color={Colors.brandPrimary} />;
        }}
      />
      <AgendaList
        sectionStyle={{
          backgroundColor: Colors.lightBackground,
          color: Colors.text,
          fontWeight: "400",
          fontSize: 16,
        }}
        contentContainerStyle={{
          backgroundColor: Colors.lightBackground,
          paddingBottom: 100,
        }}
        ListEmptyComponent={renderNonIdealState}
        sections={agendaData}
        renderItem={renderItem}
        stickySectionHeadersEnabled={true}
        refreshControl={<RefreshControl refreshing={isEventsLoading} onRefresh={handleRefresh} />}
        ItemSeparatorComponent={renderSeparatorItem}
        style={{ backgroundColor: Colors.lightBackground }}
        onEndReached={() => {
          if (limit < currentEvents.length) {
            setLimit(limit + 100);
          }
        }}
      />
    </CalendarProvider>
  );
});
