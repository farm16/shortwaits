import { BusinessHoursType } from "@shortwaits/shared-lib";

/**
 * @todo this will need translation
 * @returns "mo - tu - we - th - fr - sa - su"
 */
export const getPrettyStringFromHours = (hours: BusinessHoursType | null, locale?: string): string => {
  if (!hours) return null;
  const hoursArr: string[] = [];
  for (const day in hours) {
    for (let i = 0; i < hours[day].length; i++) {
      if (hours[day][i].isActive) {
        hoursArr.push(getTwoLetterDay(day, locale));
        break;
      }
    }
  }
  return hoursArr.toString().replace(/,/g, " - ");
};

export const getTwoLetterDay = (day: string, locale?: string): string => {
  if (locale === "es") {
    switch (day) {
      case "mon":
        return "lun";
      case "tue":
        return "mar";
      case "wed":
        return "mie";
      case "thu":
        return "jue";
      case "fri":
        return "vie";
      case "sat":
        return "sab";
      case "sun":
        return "dom";
      default:
        return day.slice(0, 2);
    }
  } else {
    return day.slice(0, 2);
  }
};

export const getPrettyStringFromDurationInMin = (durationInMin: number): string => {
  const minutes = Number(durationInMin);
  const d = Math.floor(minutes / (60 * 24));
  const h = Math.floor((minutes / 60) % 24);
  const m = Math.floor(minutes % 60);
  const dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
  const hDisplay = h > 0 ? h + (h === 1 ? " hr " : " hrs ") : "";
  const mDisplay = m >= 0 ? m + (m <= 0 ? " min " : " mins") : "";

  return dDisplay + hDisplay + mDisplay;
};

export const getPrettyStringFromDurationInMinToTime = (durationInMin: number): string => {
  const minutes = Number(durationInMin);
  const h = Math.floor((minutes / 60) % 24);
  const hDisplay = h > 0 ? h + (h === 1 ? " hr " : " hrs ") : "";
  const m = Math.floor(minutes % 60);
  const mDisplay = m >= 0 ? m + (m <= 0 ? " min " : " mins") : "";

  return hDisplay + mDisplay;
};

export const getPrettyStringDurationFromStartAndEndTime = (isoStartTime: string, isoEndTime: string, locale = "en"): string => {
  const startTime = new Date(isoStartTime);
  const endTime = new Date(isoEndTime);
  const diff = endTime.getTime() - startTime.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  return getPrettyStringFromDurationInMin(minutes);
};

/**
 * ▼hours: {
 *      ▶fri: [
 *          ▼0: {
 *              endTime: 1020
 *              isActive: true
 *              startTime: 540
 *          }
 *      ]
 *      ▶mon: []
 *      ▶sat: []
 *      ▶sun: []
 *      ▶thu: []
 *      ▶tue: []
 *      ▶wed: []
 *  */
