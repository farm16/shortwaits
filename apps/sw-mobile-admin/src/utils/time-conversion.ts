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
export const getPrettyDateFromISO = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  const prettyDate = date.toLocaleDateString("en-US", options);
  return prettyDate;
};

// outputs string in "13:00 PM - 15:00 PM"
export const getPrettyTimeRangeFromISO = (isoDateStartString: string, isoDateEndString: string | undefined): string => {
  const dateStart = new Date(isoDateStartString);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const timeStart = dateStart.toLocaleTimeString("en-US", options);

  if (isoDateEndString && isoDateEndString.trim() !== "") {
    const dateEnd = new Date(isoDateEndString);
    const timeEnd = dateEnd.toLocaleTimeString("en-US", options);
    return `${timeStart} ⇢ ${timeEnd}`;
  }

  return timeStart;
};
