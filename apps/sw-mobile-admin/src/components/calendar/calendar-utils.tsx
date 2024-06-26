import { EventsDtoType } from "@shortwaits/shared-lib";
import { formatDuration, intervalToDuration } from "date-fns";
import { isEmpty } from "lodash";
import { useMemo } from "react";

export function milliSecondsToDuration(milliSeconds: number): Duration {
  const epoch = new Date(0);
  const secondsAfterEpoch = new Date(milliSeconds);
  return intervalToDuration({
    start: epoch,
    end: secondsAfterEpoch,
  });
}

export const getEventTime = (milliSeconds: number) => {
  const formatDistanceLocale = {
    xMinutes: "{{count}} min{{plural}}",
    xHours: "{{count}} hr{{plural}}",
  };

  const shortEnLocale = {
    formatDistance: (token, count) => formatDistanceLocale[token].replace("{{count}}", count).replace("{{plural}}", count > 1 ? "s" : ""),
  };

  return formatDuration(milliSecondsToDuration(milliSeconds), {
    format: ["hours", "minutes"],
    locale: shortEnLocale,
    zero: true,
  });
};

export function getUniqueDatesFromEvents(events: EventsDtoType) {
  if (isEmpty(events)) {
    return [];
  }

  const uniqueDates = new Set<string>();

  for (const event of events) {
    const date = event.startTime.split("T")[0] + "T00:00:00.000Z";
    uniqueDates.add(date);
  }

  return Array.from(uniqueDates);
}

export const useAgendaData = (events: EventsDtoType): AgendaItems => {
  const uniqueDatesSet = new Set(events.map(item => item.startTime.split("T")[0]));
  const uniqueDates = Array.from(uniqueDatesSet);

  const eventsByDate = {};

  for (const event of events) {
    const date = event.startTime.split("T")[0];
    if (!eventsByDate[date]) {
      eventsByDate[date] = [];
    }
    eventsByDate[date].push(event);
  }

  const agendaData = uniqueDates.map(date => ({
    title: date,
    data: eventsByDate[date.split("T")[0]],
  }));

  return useMemo(() => agendaData, [agendaData]);
};

export type AgendaItemType = {
  title: string;
  data: EventsDtoType;
};
export type AgendaItems = AgendaItemType[];

export function useClosestDateFromAgendaData(data: AgendaItems) {
  // Find the title closest to today's date
  const closestTitle = useMemo(() => {
    const today = new Date();
    let closestTitle = null;
    let closestDifference = Infinity;

    for (const entry of data) {
      const entryDate = new Date(entry.title);
      const difference = Math.abs(today.getTime() - entryDate.getTime()); // Calculate time difference in milliseconds

      if (difference < closestDifference) {
        closestDifference = difference;
        closestTitle = entry.title;
      }
    }

    // If no upcoming event found, return today's date
    if (!closestTitle) {
      const todayTitle = today.toISOString().split("T")[0];

      return todayTitle;
    }

    return closestTitle;
  }, [data]);

  return closestTitle;
}
