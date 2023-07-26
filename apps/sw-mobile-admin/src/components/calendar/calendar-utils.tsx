import { isEmpty } from "lodash";
import { intervalToDuration, formatDuration } from "date-fns";
import { EventsDtoType } from "@shortwaits/shared-lib";

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
      formatDistanceLocale[token]
        .replace("{{count}}", count)
        .replace("{{plural}}", count > 1 ? "s" : ""),
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

export const getAgendaData = (events: EventsDtoType) => {
  if (events.length === 0) {
    return [];
  }

  const uniqueDatesSet = new Set(
    events.map(item => item.startTime.split("T")[0] + "T00:00:00.000Z")
  );
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

  return agendaData;
};

export function getMarkedDates(agendaItems) {
  const marked = {};

  agendaItems.forEach(item => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = { marked: true };
    } else {
      marked[item.title] = { disabled: true };
    }
  });
  return marked;
}

// export type ContextProp = {
//   context?: CalendarContextProps;
// };
// export type MarkingTypes =
//   | "dot"
//   | "multi-dot"
//   | "period"
//   | "multi-period"
//   | "custom";
// export type MarkedDates = {
//   [key: string]: MarkingProps;
// };
