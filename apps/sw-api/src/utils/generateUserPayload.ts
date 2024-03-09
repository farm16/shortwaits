import {
  AddClientsDtoType,
  BusinessUserRoles,
  BusinessUserType,
  ClientType,
  ConvertToDtoType,
  CreateBusinessUserDtoType,
  CreateBusinessUsersDtoType,
  LocalClientType,
  generateAvatarUrl,
  generateShortId,
} from "@shortwaits/shared-lib";
import { ClientSignUpWithEmailDto } from "../api/auth/dto/auth-client-user.dto";

export const generateBusinessUser = (user: CreateBusinessUserDtoType, businessUserRoles: BusinessUserRoles) => {
  // if no accountImageUrl, insert a property with a generated avatar url to the user object
  if (!user?.accountImageUrl) {
    const stringIdentifier = user.email || user.username || "?";
    user.accountImageUrl = generateAvatarUrl(stringIdentifier);
  }
  // get userRoles based on businessUserRoles
  const userRoles = {
    isStaff: businessUserRoles.some(role => role === "staff"),
    isAdmin: businessUserRoles.some(role => role === "admin"),
    isSuperAdmin: businessUserRoles.some(role => role === "superAdmin"),
    isBackgroundAdmin: businessUserRoles.some(role => role === "backgroundAdmin"),
  };

  const businessUser: ConvertToDtoType<BusinessUserType> = {
    ...user,
    username: user.email, // username is the same as email
    roleId: null,
    deleted: false,
    isDisabled: false,
    businesses: [],
    userRoles: userRoles,
    createdByBusinessId: "",
    isEmailVerified: false,
    registrationState: undefined,
    createdAt: "",
    updatedAt: "",
    lastSignInAt: "",
    hashedRt: "",
  };
  return businessUser;
};

export const generateBusinessUser_socialAuth = (user: CreateBusinessUserDtoType, businessUserRoles: BusinessUserRoles) => {
  // if no accountImageUrl, insert a property with a generated avatar url to the user object
  if (!user?.accountImageUrl) {
    const stringIdentifier = user.email || user.username || "?";
    user.accountImageUrl = generateAvatarUrl(stringIdentifier);
  }
  // get userRoles based on businessUserRoles
  const userRoles = {
    isStaff: businessUserRoles.some(role => role === "staff"),
    isAdmin: businessUserRoles.some(role => role === "admin"),
    isSuperAdmin: businessUserRoles.some(role => role === "superAdmin"),
    isBackgroundAdmin: businessUserRoles.some(role => role === "backgroundAdmin"),
  };

  const businessUser: ConvertToDtoType<BusinessUserType> = {
    ...user,
    username: user.email, // username is the same as email
    roleId: null,
    deleted: false,
    isDisabled: false,
    businesses: [],
    userRoles: userRoles,
    createdByBusinessId: "",
    isEmailVerified: true,
    registrationState: undefined,
    createdAt: "",
    updatedAt: "",
    lastSignInAt: "",
    hashedRt: "",
  };
  return businessUser;
};

export const generateBusinessStaffUsers = (users: CreateBusinessUsersDtoType) => {
  const businessUsers = users.map(user => {
    return generateBusinessUser(user, ["staff"]);
  });
  return businessUsers;
};

export const generateNewClientPayload = (user: ClientSignUpWithEmailDto) => {
  const accountImageUrl = generateAvatarUrl(user.email || "?");
  return {
    email: user.email,
    password: user.password,
    accountImageUrl: accountImageUrl,
    roleId: null,
    deleted: false,
    isDisabled: false,
  };
};

export const generateClientUsers = (users: AddClientsDtoType) => {
  const clientUsers = users.map(user => {
    return generateNewClientPayload(user);
  });
  return clientUsers;
};

type RequiredKeys = Pick<
  ClientType | LocalClientType,
  "username" | "email" | "displayName" | "familyName" | "givenName" | "middleName" | "businesses" | "password" | "hashedRt" | "clientType" | "locale"
>;
export const getNewClientPayload = (userPayloadOverride: RequiredKeys) => {
  const imageUrlIdentifier = userPayloadOverride.displayName || userPayloadOverride.familyName || userPayloadOverride.givenName || userPayloadOverride.email || "?";
  const userPayload: Omit<ClientType | LocalClientType, "_id"> = {
    shortId: generateShortId(),
    alias: "email",
    accountImageUrl: generateAvatarUrl(imageUrlIdentifier),
    deviceSetting: {
      isEmailVerified: false,
      isPhoneVerified: false,
      isTwoFactorEnabled: false,
      isTwoFactorVerified: false,
      isTouchIdEnabled: false,
      isTouchIdVerified: false,
      isFaceIdEnabled: false,
      isFaceIdVerified: false,
      isPasswordlessEnabled: false,
    },
    accountSettings: {
      isDarkModeEnabled: false,
      isNotificationsEnabled: false,
      isLocationEnabled: false,
      isLocationShared: false,
      isLocationSharedWithBusinesses: false,
    },
    deleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastSignInAt: new Date(),
    registration: {
      isRegistered: true,
      state: {
        screenName: "",
        state: 2,
        messages: ["Your account is pending verification."],
        isPendingVerification: true,
      },
    },
    currentMembership: {
      membershipId: null,
      membershipShortId: "1000",
      membershipShortName: "Free",
      status: "active",
      invoiceId: null,
      isFaulty: false,
      faultyReason: null,
    },
    roleId: null,
    billing: null,
    phoneNumbers: [],
    imAddresses: [],
    addresses: [],
    desiredCurrencies: [],
    isSocialAccount: false,
    socialAccount: {
      kind: "",
      uid: "",
      username: "",
    },
    ...userPayloadOverride,
  };
  return userPayload;
};

export const getSupportedLocales = (locale: string) => {
  const supportedLocales = {
    en: {
      countryCode: "US",
      isRTL: false,
      languageCode: "en",
      languageTag: "en-US",
    },
    es: {
      countryCode: "PE",
      isRTL: false,
      languageCode: "es",
      languageTag: "es-PE",
    },
  };

  return supportedLocales[locale] || supportedLocales["en"];
};
