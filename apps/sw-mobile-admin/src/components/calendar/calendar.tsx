import React, { FC, memo, useCallback, useMemo } from "react";
import { RefreshControl, SectionListData } from "react-native";
import { EventType } from "@shortwaits/shared-lib";
import { CalendarProvider, ExpandableCalendar, AgendaList } from "@shortwaits/calendar";

import { Colors } from "../../theme";
import { useCalendarTheme } from "./calendar-hooks";
import { AgendaItem } from "./calendar-item";
import { Button, Space } from "../common";
import { getAgendaData } from "./calendar-utils";
import { useGetEventsByBusinessQuery } from "../../services";
import { useBusiness } from "../../store";
import { ActivityIndicator } from "react-native-paper";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { NonIdealState } from "../non-ideal-state/non-ideal-state";
import { navigate } from "../../utils";

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
  const business = useBusiness();
  const [limit, setLimit] = React.useState(100);

  const {
    data: eventsPayload,
    isLoading: isEventsLoading,
    isError: isEventsError,
    refetch: refetchEvents,
  } = useGetEventsByBusinessQuery(
    {
      businessId: business._id,
      query: {
        limit,
      },
    } ?? skipToken
  );

  // console.log(eventsPayload?.data.length);

  const agendaData = useMemo(() => getAgendaData(eventsPayload?.data ?? []), [eventsPayload?.data]);

  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);
  const renderSeparatorItem = useCallback(() => <Space size="tiny" direction="horizontal" />, []);
  const handleRefresh = useCallback(() => {
    if (!isEventsLoading) refetchEvents();
  }, [isEventsLoading, refetchEvents]);

  // console.log("rendering calendar");
  // console.log("agendaData >>>", JSON.stringify(agendaData, null, 2));
  // console.log("eventsPayload?.data", eventsPayload?.data);
  // console.log("agendaData");

  const formattedDate = useMemo(() => {
    // const date = isEmpty(agendaData)
    //   ? new Date()
    //   : new Date(agendaData[0].title);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    return currentDate;
  }, []);

  // console.log("formattedDate", agendaData[agendaData.length - 1]?.title);
  // console.log("formattedDate", formattedDate);

  if (isEventsLoading) {
    return <ActivityIndicator />;
  }
  return (
    <CalendarProvider
      date={formattedDate}
      showTodayButton={true}
      todayButtonStyle={{
        backgroundColor: Colors.brandSecondary,
      }}
      theme={theme}
    >
      <ExpandableCalendar
        keyExtractor={item => {
          // console.log("item", item);
          return item;
        }}
        theme={theme}
        firstDay={1}
      />
      <AgendaList
        sectionStyle={{
          backgroundColor: "rgb(245, 245, 245)",
          color: Colors.text,
          fontWeight: "400",
          fontSize: 16,
        }}
        contentContainerStyle={{
          backgroundColor: "rgb(245, 245, 245)",
        }}
        ListEmptyComponent={() => (
          <NonIdealState
            image={"noEvents"}
            buttons={
              <Button
                text="Add Event"
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
        )}
        keyExtractor={item => {
          // console.log("item._id", item._id);
          return item._id;
        }}
        theme={theme}
        sections={agendaData}
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
        refreshControl={<RefreshControl refreshing={isEventsLoading} onRefresh={handleRefresh} />}
        ItemSeparatorComponent={renderSeparatorItem}
        style={{ backgroundColor: Colors.backgroundOverlay }}
        onEndReached={() => {
          if (limit < eventsPayload?.data.length) {
            setLimit(limit + 100);
          }
        }}
      />
    </CalendarProvider>
  );
});
