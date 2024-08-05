// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose, { ObjectId as MongoObjectId, Document as MongooseDocument, Types } from "mongoose";
import "mongoose-paginate-v2";
import { ClientDtoType, LocalClientDtoType } from "../server";
import { EmojiType } from "./emoji";

export type Document = MongooseDocument;
export type ObjectId = MongoObjectId | Types.ObjectId;

export type BusinessClientType = "external" | "local";
export type AllClientsType = (Omit<LocalClientDtoType, "clientType"> & { clientType: BusinessClientType })[];

export type MergeAndOverride<T1, T2> = Omit<T1, keyof T2> & T2;

export type CombinedClientType = MergeAndOverride<Omit<ClientDtoType, "clientType">, Omit<LocalClientDtoType, "clientType"> & { clientType: "local" | "external" }>;

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type DtoFriendlyType<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? U extends ObjectId
      ? string[] // Convert array of ObjectId to array of strings
      : U[] // Keep array elements unchanged if not ObjectId
    : T[K] extends ObjectId
    ? string // Convert ObjectId to string
    : T[K] extends Date
    ? string // Convert Date to string
    : T[K] extends Record<string, any>
    ? DtoFriendlyType<T[K]> // Handle nested objects
    : T[K]; // Keep other property types unchanged
};

export type MethodType<T, Q = undefined, B = undefined> = {
  query: Q;
  body: B;
  response: CommonResponseType<T>;
};

export type WithDbProps<T> = T & {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type ClientRegistration = {
  isRegistered: boolean; // if the user has completed the registration process ( code 2)
  registrationType: "local" | "external";
  state: {
    screenName?: string;
    // 0: not started, 1: pending, 2: completed , 3:verified, 4: failed, 5: blocked, 6: aborted, 7: frozen( when is business local client)
    state: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    messages?: string[]; // messages to be displayed to the user based on the state
    isPendingVerification: boolean; // if the user has completed the registration process but the email is not verified yet
  };
};

export type AddressType = {
  label: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  state: string;
  postCode: string;
  country: string;
};

export type LocaleType = {
  countryCode: string;
  isRTL: boolean;
  languageCode: string;
  languageTag: string;
};

export type SocialAccountType = {
  kind: string;
  uid?: string;
  username?: string;
};

export type ShortwaitsAdminUserRoles = {
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isBackgroundAdmin: boolean;
  isStaff: boolean;
};

export type PhoneNumberType = {
  label: string;
  number: string;
};

export type UserDeviceSettings = {
  deviceUuid: string;
  hasExportedContacts: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isTwoFactorEnabled: boolean;
  isTwoFactorVerified: boolean;
  isTouchIdEnabled: boolean;
  isTouchIdVerified: boolean;
  isFaceIdEnabled: boolean;
  isFaceIdVerified: boolean;
  isPasswordlessEnabled: boolean;
};

export type UserAccountSettings = {
  isDarkModeEnabled: boolean;
  isNotificationsEnabled: boolean;
  isLocationEnabled: boolean;
  isLocationShared: boolean;
  isLocationSharedWithBusinesses: boolean;
};

export type CurrentMembershipType = {
  membershipId: ObjectId;
  membershipShortId: string;
  membershipShortName: string;
  status: string;
  invoiceId: ObjectId;
  isFaulty: boolean;
  faultyReason: string[];
};

export type StaffRegistrationStateType = {
  screenName: string;
  state: number;
  isCompleted: boolean;
};

export type Alias = "username" | "familyName" | "givenName" | "middleName" | "displayName" | "email";

export type PaginatedModel<T extends Document> = mongoose.PaginateModel<T>;

export type ServiceColorType = {
  colorId: string;
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

export type BusinessLocationType = {
  formattedAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: number[];
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

export type BusinessHourWeekDayType = keyof WeekHoursType;

export type WeekDayType = Partial<WeekHoursType>;

export type WeekDayTimeRangeType = {
  startTime: number;
  endTime: number;
  isActive: boolean;
};

export type BusinessWeekDaysType = keyof typeof WEEKDAYS;

export type DocType<T = never> = T & {
  _id: ObjectId;
};

export type BusinessAccountType = "free" | "student" | "basic" | "trial" | "business" | "premium" | "enterprise" | "partner";

export type BusinessWebConfigType = {
  isActive: boolean;
  baseUrl: string;
  bannerImageUrl: string;
  logoImageUrl: string;
  faviconImageUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  notificationMessage: string;
};

export type BusinessLabelType = {
  name: string;
  description: string;
  isFavorite: boolean;
  emojiShortName: EmojiType;
};

export type BusinessBookingConfigType = {
  allowBooking: boolean;
  allowRescheduling: boolean;
  allowCancellation: boolean;
  allowPayment: boolean;
  allowCheckIn: boolean;
  allowCheckOut: boolean;
  allowNoShow: boolean;
  allowWaitlist: boolean;
};

export type BusinessTaggedClientType = {
  clientId: ObjectId;
  services: ObjectId[];
  tags: string[];
};

export type BusinessVideoConferenceIntegrationType =
  | "youTube"
  | "zoom"
  | "twitch"
  | "x"
  | "skype"
  | "discord"
  | "facebookLive"
  | "instagram"
  | "googleMeet"
  | "microsoftTeams"
  | "slack"
  | "custom";

export type BusinessVideoConferenceType = {
  type: BusinessVideoConferenceIntegrationType;
  label: string;
  name?: string;
  isActive: boolean;
  url: string;
};

export type BusinessVideoConferencesType = BusinessVideoConferenceType[];

export interface CommonResponseType<DataPayload = unknown, MetaPayload = unknown> {
  statusCode: number;
  data: DtoFriendlyType<DataPayload>;
  message?: string;
  meta?: MetaPayload;
  errorCode?: ErrorCodeType;
}

export type HttpMethod = "GET" | "DELETE" | "PUT" | "POST";

export type ErrorCodeType = keyof typeof ERROR_CODES;

export const ERROR_CODES = {
  11: { code: 11, description: "business categories error" },
  12: { code: 12, description: "business services error" },
  13: { code: 13, description: "users services error" },
  131: { code: 131, description: "users controller error" },
  14: { code: 14, description: "my business controller error" },
  15: { code: 15, description: "shortwaits default data controller error" },
  16: { code: 16, description: "server error," },
  20: { code: 20, description: "validation error" },
  21: { code: 21, description: "authorization error" },
  23: { code: 23, description: "mongo error" },
  25: { code: 25, description: "console log error" },
  26: { code: 26, description: "authorization error sign in" },
  27: { code: 27, description: "authorization error sign out" },
  28: { code: 28, description: "authorization error signup" },
} as const;
