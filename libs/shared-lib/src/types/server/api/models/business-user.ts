import {
  AddressType,
  Alias,
  LocaleType,
  ObjectId,
  PhoneNumberType,
  ShortwaitsAdminUserRoles,
  SocialAccountType,
  StaffRegistrationStateType,
  UserAccountSettings,
  UserDeviceSettings,
  WeekHoursType,
} from "../../../";

/**
 *
 * regarding methods and statics and TS
 * @link https://github.com/Automattic/mongoose/issues/10358
 *
 * regarding methods and statics (password hashing method)
 * @link https://mongoosejs.com/docs/guide.html#:~:text=Do%20not%20declare%20methods%20using%20ES6%20arrow%20functions%20(%3D%3E).%20Arrow%20functions%20explicitly%20prevent%20binding%20this%2C%20so%20your%20method%20will%20not%20have%20access%20to%20the%20document%20and%20the%20above%20examples%20will%20not%20work.
 *
 */

export type UserMethodsType = {
  encryptPassword: (param1: string) => Promise<string>;
  matchPassword: (param1: string) => Promise<boolean>;
};

export type BusinessUserRole = "admin" | "superAdmin" | "backgroundAdmin" | "staff";
export type BusinessUserRoles = BusinessUserRole[];

export type BusinessUserType = {
  shortId: string;
  businesses: ObjectId[];
  isDisabled: boolean; // if this is set to true, the user will not be able to login but user will be visible in the list of users
  userRoles: ShortwaitsAdminUserRoles;
  createdByBusinessId: ObjectId; // if this is set and user "A" is superAdmin, user "A" can delete or update this user
  // Also we need to let the user know that this user is created by a business (super admin) and belongs to that business
  deleted: boolean; // will not be shown in the list of users, but the data will be kept
  registrationState: StaffRegistrationStateType;
  createdAt: string;
  updatedAt: string;
  lastSignInAt: Date;
  roleId: ObjectId;
  hashedRt: string;
  isEmailVerified: boolean; // once email is verified, this should be set to true

  // below are fields that are not protected
  // contact =========
  username: string; // this should be unique for each user (business)
  alias: Alias;
  displayName: string;
  familyName: string;
  givenName: string;
  middleName: string;
  // ================
  accountImageUrl: string;
  email: string; // no longer unique for each user (business)
  password: string;
  isPasswordProtected: boolean;
  locale: LocaleType;
  phoneNumbers: PhoneNumberType[];
  imAddresses: {
    username: string;
    service: string;
  }[];
  addresses: AddressType[];
  isSocialAccount: boolean;
  socialAccounts: SocialAccountType[];
  deviceSettings: UserDeviceSettings[];
  accountSettings: UserAccountSettings;
  desiredCurrencies: string[];

  hours: WeekHoursType;
  birthday: string;
};
