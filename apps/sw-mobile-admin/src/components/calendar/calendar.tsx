import React, { FC, memo, useCallback } from "react";
import { RefreshControl, SectionListData } from "react-native";
import { EventType } from "@shortwaits/shared-lib";
import { CalendarProvider, ExpandableCalendar, AgendaList } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from "../../theme";
import { useCalendarTheme } from "./calendar-hooks";
import { AgendaItem } from "./calendar-item";
import { Button, Space } from "../common";
import { useClosestDateFromAgendaData, useAgendaData } from "./calendar-utils";
import { useGetEventsByBusinessQuery } from "../../services";
import { useBusiness, useEvents, useMobileAdmin } from "../../store";
import { ActivityIndicator } from "react-native-paper";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { NonIdealState } from "../non-ideal-state/non-ideal-state";
import { navigate } from "../../utils";
import { useIntl } from "react-intl";
import { LocaleConfig } from "./calendar-locales";

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

  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);
  const renderSeparatorItem = useCallback(() => <Space size="tiny" direction="horizontal" />, []);
  const handleRefresh = useCallback(() => {
    if (!isEventsLoading) refetchEvents();
  }, [isEventsLoading, refetchEvents]);
  const renderNonIdealState = useCallback(() => {
    return (
      <NonIdealState
        type={"noEvents"}
        buttons={
          <Button
            text={intl.formatMessage({ id: "Events_Screen.nonIdealState.button" })}
            preset="accent"
            onPress={() => {
              navigate("modals", {
                screen: "form-modal-screen",
                params: {
                  form: "addEvent",
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
      date={initialDate}
      showTodayButton={true}
      todayButtonStyle={{
        backgroundColor: Colors.brandSecondary,
      }}
      theme={theme}
    >
      <ExpandableCalendar
        theme={theme}
        firstDay={1}
        hideArrows={false}
        allowShadow={true}
        renderArrow={direction => {
          return <Icon name={`chevron-${direction}`} size={24} color={Colors.text} />;
        }}
      />
      <AgendaList
        sectionStyle={{
          backgroundColor: "rgb(245, 245, 245)",
          color: Colors.text,
          fontWeight: "400",
          fontSize: 16,
        }}
        contentContainerStyle={{
          backgroundColor: Colors.backgroundOverlay,
          paddingBottom: 100,
        }}
        ListEmptyComponent={renderNonIdealState}
        sections={agendaData}
        renderItem={renderItem}
        stickySectionHeadersEnabled={true}
        refreshControl={<RefreshControl refreshing={isEventsLoading} onRefresh={handleRefresh} />}
        ItemSeparatorComponent={renderSeparatorItem}
        style={{ backgroundColor: Colors.backgroundOverlay }}
        onEndReached={() => {
          if (limit < currentEvents.length) {
            setLimit(limit + 100);
          }
        }}
      />
    </CalendarProvider>
  );
});
