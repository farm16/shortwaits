import {
  BusinessUserRoles,
  BusinessUserType,
  ClientType,
  CreateBusinessUserDtoType,
  CreateBusinessUsersDtoType,
  DtoFriendlyType,
  LocalClientType,
  generateAvatarUrl,
  generateShortId,
} from "@shortwaits/shared-lib";

const defaultStaffHours = {
  mon: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  tue: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  wed: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  thu: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  fri: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  sat: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  sun: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
};

export const generateBusinessUser = (user: CreateBusinessUserDtoType, businessUserRoles: BusinessUserRoles, businessId?: string) => {
  // if no accountImageUrl, insert a property with a generated avatar url to the user object
  if (!user?.accountImageUrl) {
    const stringIdentifier = user.email || user.username || user.displayName || user.familyName || user.middleName || "?";
    user.accountImageUrl = generateAvatarUrl(stringIdentifier);
  }
  // get userRoles based on businessUserRoles
  const userRoles = {
    isStaff: businessUserRoles.some(role => role === "staff"),
    isAdmin: businessUserRoles.some(role => role === "admin"),
    isSuperAdmin: businessUserRoles.some(role => role === "superAdmin"),
    isBackgroundAdmin: businessUserRoles.some(role => role === "backgroundAdmin"),
  };

  const phoneNumbers = [
    {
      label: "mobile",
      number: "",
    },
    {
      label: "work",
      number: "",
    },
    {
      label: "home",
      number: "",
    },
  ];

  const addresses = [
    {
      label: "",
      address1: "",
      address2: "",
      city: "",
      region: "",
      state: "",
      postCode: "",
      country: "",
    },
    {
      label: "",
      address1: "",
      address2: "",
      city: "",
      region: "",
      state: "",
      postCode: "",
      country: "",
    },
  ];

  const dateNow = new Date().toISOString();

  const businessUser: DtoFriendlyType<BusinessUserType> = {
    ...user,
    shortId: generateShortId(),
    alias: "username",
    username: user.username || user.email, // username is the same as email
    roleId: null,
    deleted: false,
    isDisabled: false,
    businesses: [businessId],
    userRoles: userRoles,
    isEmailVerified: false,
    registrationState: undefined,
    createdAt: dateNow,
    updatedAt: dateNow,
    lastSignInAt: "",
    hashedRt: "",
    createdByBusinessId: businessId || "",
    birthday: user.birthday || "",
    hours: user.hours || defaultStaffHours,
    phoneNumbers: user.phoneNumbers || phoneNumbers,
    addresses: user.addresses || addresses,
    deviceSettings: user.deviceSettings || [
      {
        deviceUuid: "",
        hasExportedContacts: false,
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
    ],
    accountSettings: user.accountSettings || {
      isDarkModeEnabled: false,
      isNotificationsEnabled: false,
      isLocationEnabled: false,
      isLocationShared: false,
      isLocationSharedWithBusinesses: false,
    },
    desiredCurrencies: ["USD"],
  };
  return businessUser;
};

export const generateBusinessUser_socialAuth = (user: Partial<BusinessUserType>, businessUserRoles: BusinessUserRoles) => {
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

  const businessUser = {
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

export const generateBusinessUsers = (businessUsers: CreateBusinessUsersDtoType, businessId: string) => {
  return businessUsers.map(user => {
    return generateBusinessUser(user, ["staff"], businessId);
  });
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
    deviceSettings: [
      {
        deviceUuid: "",
        hasExportedContacts: false,
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
    ],
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
      registrationType: "local",
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
