/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Document, Types } from "mongoose";

export type PaginatedModel<T extends Document> = mongoose.PaginateModel<T>;

export type ServiceColorType = {
  colorId: string | number;
  colorName: string;
  hexCode: string;
  isSelected: boolean | null;
  isDefault: boolean;
};
export type ServiceColorsType = Record<string, ServiceColorType>;
export type TimestampDoc = {
  createdAt?: Date;
  updatedAt?: Date;
};
export type ILocale = {
  languageCode: string;
  scriptCode?: string;
  countryCode: string;
  languageTag: string;
  isRTL: boolean;
};

export const WEEKDAYS = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
} as const;

export const WEEKDAYS_ARR = Object.keys(WEEKDAYS) as BusinessWeekDaysType[];

// My business helpers

export type BusinessLocationType = {
  formattedAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: [number, number];
};

export type BusinessAvailableCurrenciesType = "USD" | "PEN";

export type CurrencyType = {
  name: string;
  code: string;
  symbol: string;
  codeNumber: number;
  decimalSeparator: number;
};
export type BusinessHoursType = WeekHoursType;

export type WeekHoursType = {
  mon: WeekDayTimeRangeType[];
  tue: WeekDayTimeRangeType[];
  wed: WeekDayTimeRangeType[];
  thu: WeekDayTimeRangeType[];
  fri: WeekDayTimeRangeType[];
  sat: WeekDayTimeRangeType[];
  sun: WeekDayTimeRangeType[];
};

export type WeekDayType = Partial<WeekHoursType>;

export type WeekDayTimeRangeType = {
  startTime: number;
  endTime: number;
  isActive: boolean;
};

export type BusinessWeekDaysType = keyof typeof WEEKDAYS;
