import { BusinessHoursType } from "@shortwaits/shared-types";

/**
 * @todo this will need translation
 * @returns "mo - tu - we - th - fr - sa - su"
 */
export const getPrettyStringFromHours = (
  hours: BusinessHoursType | null
): string => {
  if (!hours) return "select your business hours";
  const hoursArr: string[] = [];
  for (const day in hours) {
    for (let i = 0; i < hours[day].length; i++) {
      if (hours[day][i].isActive) {
        hoursArr.push(getTwoLetterDay(day));
        break;
      }
    }
  }
  return hoursArr.toString().replace(/,/g, " - ");
};

export const getTwoLetterDay = (day: string): string => day.slice(0, 2);

export const getPrettyStringFromDurationInMin = (
  durationInMin: number
): string => {
  const minutes = Number(durationInMin);
  const d = Math.floor(minutes / (60 * 24));
  const h = Math.floor((minutes / 60) % 24);
  const m = Math.floor(minutes % 60);
  const dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
  const hDisplay = h > 0 ? h + (h === 1 ? " hr " : " hrs ") : "";
  const mDisplay = m >= 0 ? m + (m <= 0 ? " min " : " mins ") : "";

  return dDisplay + hDisplay + mDisplay;
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
