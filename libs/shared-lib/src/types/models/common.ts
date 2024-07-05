import { ObjectId } from "../common";

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
