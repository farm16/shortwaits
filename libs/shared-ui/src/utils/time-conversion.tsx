import { format, parseISO } from "date-fns";
import { enUS, es } from "date-fns/locale";
import React from "react";
import { TextStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "../components";
const locales = {
  en: enUS,
  "en-US": enUS,
  es,
} as const;
type Locale = keyof typeof locales;

const LOCALES = {
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
} as const;

export const get12hrTimeFromDecimal = (decimal: number): string => {
  const timeArr = getTimeArrFromDecimal(decimal);
  if (timeArr.length === 0) {
    return "--:--";
  }
  const meridiem = timeArr[0] >= 12 ? "pm" : "am";
  timeArr[0] = timeArr[0] % 12 || 12;
  return `${timeArr[0]}:${timeArr[1] < 10 ? "0" + timeArr[1] : timeArr[1]} ${meridiem}`;
};
export const get24hrTimeFromDecimal = (decimal: number): string => {
  const timeArr = getTimeArrFromDecimal(decimal);
  if (timeArr.length === 0) {
    return "--:--";
  }
  return `${timeArr[0]}:${timeArr[1] < 10 ? "0" + timeArr[1] : timeArr[1]}`;
};
export const getTimeArrFromDecimal = (decimal: number): [number, number] | [] => {
  if (decimal < 0 || decimal > 1440) {
    return [];
  }
  const hours = Math.floor(decimal / 60);
  const minutes = decimal % 60;
  return [hours, minutes];
};
export const getTimeDurationsFromMins = mins => {
  return "";
};

// outputs string in "Wednesday, 24 Aug"
export const getPrettyDateFromISO = (isoDateString: string, locale: string): string => {
  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  const prettyDate = date.toLocaleDateString(LOCALES[locale ?? "en"], options);
  return prettyDate;
};

// outputs string in "13:00 PM - 15:00 PM"
export const getTimesFromISO = (isoDateStartString: string, isoDateEndString?: string, overrideLocale?: Locale) => {
  const locale = locales[overrideLocale ?? "en"];
  const dateStart = parseISO(isoDateStartString);
  const timeStart = format(dateStart, "h:mm a", { locale });

  if (isoDateEndString && isoDateEndString.trim() !== "") {
    const dateEnd = parseISO(isoDateEndString);
    const timeEnd = format(dateEnd, "h:mm a", { locale });
    return [timeStart, timeEnd];
  }

  return [timeStart];
};

type TimeRangeProps = {
  startTime: string;
  endTime?: string;
  locale?: Locale;
  style?: TextStyle;
};
export const TimeRange = ({ startTime, endTime, locale = "en", style }: TimeRangeProps) => {
  const [start, end] = getTimesFromISO(startTime, endTime, locale);
  return (
    <Text style={style}>
      {start}
      {end ? (
        <>
          {" "}
          <Icon name={"arrow-right"} color={"grey"} size={14} />{" "}
        </>
      ) : null}
      {end}
    </Text>
  );
};
