import { isEmpty } from "lodash";
import { intervalToDuration, formatDuration } from "date-fns";
import { EventsDtoType } from "@shortwaits/shared-lib";
import { useMemo } from "react";
import { today } from "xdate";

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
    formatDistance: (token, count) =>
      formatDistanceLocale[token].replace("{{count}}", count).replace("{{plural}}", count > 1 ? "s" : ""),
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

export const useAgendaData = (events: EventsDtoType): agendaItems => {
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

type agendaItems = {
  title: string;
  data: EventsDtoType;
}[];

export function useClosestDateFromAgendaData(data: agendaItems) {
  // Get today's date

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
      const titleFormat = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      closestTitle = titleFormat.format(today);
    }

    return closestTitle;
  }, [data]);

  return closestTitle;
}
