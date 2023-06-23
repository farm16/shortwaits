import { isEmpty } from "lodash";
import { intervalToDuration, formatDuration, format } from "date-fns";
import { EventsDtoType } from "@shortwaits/shared-types";

export function getFutureDates(numberOfDays: number) {
  const array: string[] = [];
  for (let index = 1; index <= numberOfDays; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split("T")[0];
    array.push(dateString);
  }
  return array;
}

export function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split("T")[0];
}

export const today = new Date().toISOString().split("T")[0];
export const fastDate = getPastDate(3);
export const futureDates = getFutureDates(9);
export const dates = [fastDate, today].concat(futureDates);

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

export const formatDateToCalendarDate = (date: string | Date) => {
  const _date = typeof date === "string" ? new Date(date) : date;
  const formattedDate = format(_date, "MM/dd/yyyy");
  return formattedDate;
};

export const getCalendarItems = (events: EventsDtoType) => {
  if (!events) return [];
  const allDates = events.map(event =>
    formatDateToCalendarDate(event.startTime)
  );
  const items = [...new Set(allDates)].map((date, index) => {
    return {
      title: "",
      data: events.filter(
        event => formatDateToCalendarDate(event.startTime) === date
      ),
      index,
    };
  });
  // console.log("getCalendarItems >>>", JSON.stringify(items));
  return items;
};

type MarkedDates = {
  [key: string]: object;
};
