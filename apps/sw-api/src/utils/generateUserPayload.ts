import { ClientUserType, CreateBusinessUserDtoType, CreateBusinessUsersDtoType, CreateClientUsersDtoType, generateAvatarUrl } from "@shortwaits/shared-lib";
import { ClientSignUpWithEmailDto } from "../api/auth/dto/auth-client-user.dto";

export const generateBusinessUser = (user: CreateBusinessUserDtoType) => {
  let accountImageUrl = "";
  if (user.accountImageUrl === "" || user.accountImageUrl === null || user.accountImageUrl === undefined) {
    const stringIdentifier = user.familyName || user.givenName || user.middleName || user.username || user.email || user.displayName || "?";
    accountImageUrl = generateAvatarUrl(stringIdentifier);
  } else {
    accountImageUrl = user.accountImageUrl;
  }
  return {
    ...user,
    accountImageUrl,
    roleId: null,
    deleted: false,
    isDisabled: false,
  };
};

export const generateBusinessUsers = (users: CreateBusinessUsersDtoType) => {
  const businessUsers = users.map(user => {
    return generateBusinessUser(user);
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

export const generateClientUsers = (users: CreateClientUsersDtoType) => {
  const clientUsers = users.map(user => {
    return generateNewClientPayload(user);
  });
  return clientUsers;
};

export const getDefaultClientPayloadValues = (userPayloadOverride: Partial<ClientUserType>) => {
  const userPayload: ClientUserType = {
    shortId: "",
    email: "",
    password: "",
    accountImageUrl: "",
    roleId: null,
    deleted: false,
    businesses: null,
    clientType: "local",
    username: "",
    alias: "username",
    displayName: "",
    familyName: "",
    givenName: "",
    middleName: "",
    locale: {
      countryCode: "",
      isRTL: false,
      languageCode: "",
      languageTag: "",
    },
    phoneNumbers: null,
    imAddresses: null,
    addresses: null,
    socialAccounts: null,
    desiredCurrencies: null,
    billing: {
      invoiceId: null,
    },
    createdAt: "",
    updatedAt: "",
    lastSignInAt: undefined,
    hashedRt: "",
    registration: {
      isRegistered: false,
      state: {
        screenName: "",
        state: 0,
        messages: null,
        isPendingVerification: true,
      },
    },
    currentMembership: null,
  };
  return {
    ...userPayload,
    ...userPayloadOverride,
  };
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
