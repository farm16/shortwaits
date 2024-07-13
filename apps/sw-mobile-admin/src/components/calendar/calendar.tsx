import { skipToken } from "@reduxjs/toolkit/dist/query";
import { EventDtoType, EventType } from "@shortwaits/shared-lib";
import { ActivityIndicator, Button, Colors, NonIdealState, Space, getResponsiveHeight } from "@shortwaits/shared-ui";
import React, { FC, memo, useCallback } from "react";
import { useIntl } from "react-intl";
import { RefreshControl, SectionListData, SectionListRenderItem, View } from "react-native";
import { AgendaList, CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { navigate } from "../../navigation/navigation-utils";
import { useGetBusinessEventsQuery } from "../../services";
import { useBusiness, useEvents } from "../../store";
import { useCalendarTheme } from "./calendar-hooks";
import { AgendaItem } from "./calendar-item";
import { LocaleConfig } from "./calendar-locales";
import { AgendaItemType, useAgendaData, useClosestDateFromAgendaData } from "./calendar-utils";

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

  const filteredEvents = currentEvents?.filter(event => {
    console.log("event?.status?.statusName", event?.status?.statusName);
    const isCompleted = event?.status?.statusName === "COMPLETED";
    const isCanceled = event?.status?.statusName === "CANCELED";
    return !isCompleted && !isCanceled;
  });
  const agendaData = useAgendaData(filteredEvents ?? []);
  const intl = useIntl();

  const locale = intl.locale || "en";

  LocaleConfig.defaultLocale = locale;

  const [limit, setLimit] = React.useState(100);

  const {
    isLoading: isEventsLoading,
    isError: isEventsError,
    refetch: refetchEvents,
  } = useGetBusinessEventsQuery(
    {
      businessId: currentBusiness._id,
      query: {
        limit,
      },
    } ?? skipToken
  );

  let hasBeenTicked = true;
  const renderItem: SectionListRenderItem<EventDtoType, AgendaItemType> = useCallback(({ section, item, index }) => {
    const triggerTick = hasBeenTicked && index === 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we need this to reset
    hasBeenTicked = false;
    return <AgendaItem item={item} triggerTick={triggerTick} />;
  }, []);

  const renderSeparatorItem = useCallback(() => <Space size="tiny" direction="horizontal" />, []);

  const handleRefresh = useCallback(() => {
    if (!isEventsLoading) refetchEvents();
  }, [isEventsLoading, refetchEvents]);

  const renderNonIdealState = useCallback(() => {
    const handleNonIdealStateOnDone = () => {
      if (!isEventsLoading) {
        refetchEvents();
      }
    };
    const handleNonIdealStateButtonPress = () => {
      navigate("modals", {
        screen: "add-event-modal-screen",
        params: {
          onDone: handleNonIdealStateOnDone,
        },
      });
    };
    return (
      <View
        style={{
          marginTop: getResponsiveHeight(16),
          marginHorizontal: getResponsiveHeight(32),
        }}
      >
        <NonIdealState type={"noEvents"} buttons={<Button text={intl.formatMessage({ id: "Events_Screen.nonIdealState.button" })} onPress={handleNonIdealStateButtonPress} />} />
      </View>
    );
  }, [intl, isEventsLoading, refetchEvents]);

  const initialDate = useClosestDateFromAgendaData(agendaData);

  if (isEventsLoading) {
    return <ActivityIndicator />;
  }

  // console.log("initialDate", initialDate);
  // console.log("agendaData", agendaData);

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
