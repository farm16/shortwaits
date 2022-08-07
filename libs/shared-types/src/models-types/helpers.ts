/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Document, Types } from 'mongoose';

export type PaginatedModel<T extends Document> = mongoose.PaginateModel<T>;

export type ServiceColorType = {
  readonly colorId: string | number;
  readonly colorName: string;
  readonly hexCode: string;
  readonly isSelected: boolean | null;
  readonly isDefault: boolean;
};
export type ServiceColorsType = Record<string, ServiceColorType>;
export type TimestampDoc = {
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
};
export type ILocale = {
  readonly languageCode: string;
  readonly scriptCode?: string;
  readonly countryCode: string;
  readonly languageTag: string;
  readonly isRTL: boolean;
};

export const WEEKDAYS = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
} as const;

// My business helpers

export type BusinessLocationType = {
  readonly formattedAddress: string;
  readonly streetAddress: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
  readonly coordinates: readonly [number, number];
};

export type BusinessAvailableCurrenciesType = 'USD' | 'PEN';

export type CurrencyType = {
  readonly name: string;
  readonly code: string;
  readonly symbol: string;
  readonly codeNumber: number;
  readonly decimalSeparator: number;
};
export type BusinessHoursType = {
  readonly mon: readonly BusinessDayTimeRangeType[];
  readonly tue: readonly BusinessDayTimeRangeType[];
  readonly wed: readonly BusinessDayTimeRangeType[];
  readonly thu: readonly BusinessDayTimeRangeType[];
  readonly fri: readonly BusinessDayTimeRangeType[];
  readonly sat: readonly BusinessDayTimeRangeType[];
  readonly sun: readonly BusinessDayTimeRangeType[];
};

export type BusinessDayTimeRangeType = {
  readonly startTime: number;
  readonly endTime: number;
  readonly isActive: boolean;
};

export type BusinessWeekDaysType = keyof typeof WEEKDAYS;
