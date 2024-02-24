import * as Yup from "yup";

const deviceSettingSchema = Yup.object().shape({
  isEmailVerified: Yup.boolean(),
  isPhoneVerified: Yup.boolean(),
  isTwoFactorEnabled: Yup.boolean(),
  isTwoFactorVerified: Yup.boolean(),
  isTouchIdEnabled: Yup.boolean(),
  isTouchIdVerified: Yup.boolean(),
  isFaceIdEnabled: Yup.boolean(),
  isFaceIdVerified: Yup.boolean(),
  isPasswordlessEnabled: Yup.boolean(),
});

const accountSettingsSchema = Yup.object().shape({
  isDarkModeEnabled: Yup.boolean(),
  isNotificationsEnabled: Yup.boolean(),
  isLocationEnabled: Yup.boolean(),
  isLocationShared: Yup.boolean(),
  isLocationSharedWithBusinesses: Yup.boolean(),
});

const socialAccountSchema = Yup.object().shape({
  kind: Yup.string(),
  uid: Yup.string(),
  username: Yup.string(),
});

const localeSchema = Yup.object().shape({
  countryCode: Yup.string(),
  isRTL: Yup.boolean(),
  languageCode: Yup.string(),
  languageTag: Yup.string(),
});

const phoneNumbersSchema = Yup.array().of(
  Yup.object().shape({
    label: Yup.string(),
    number: Yup.string(), // validations is done via PhoneInput component
  })
);

const imAddressesSchema = Yup.array().of(
  Yup.object().shape({
    username: Yup.string(),
    service: Yup.string(),
  })
);

const addressesSchema = Yup.array().of(
  Yup.object().shape({
    label: Yup.string(),
    address1: Yup.string(),
    address2: Yup.string(),
    city: Yup.string(),
    region: Yup.string(),
    state: Yup.string(),
    postCode: Yup.string(),
    country: Yup.string(),
  })
);

const socialAccountsSchema = Yup.array().of(
  Yup.object().shape({
    kind: Yup.string(),
    uid: Yup.string(),
    username: Yup.string(),
  })
);

const billingSchema = Yup.object().shape({
  membershipId: Yup.string(),
  membershipShortId: Yup.string(),
  membershipShortName: Yup.string(),
  status: Yup.string(),
  invoiceId: Yup.string(),
  isFaulty: Yup.boolean(),
  faultyReason: Yup.array().of(Yup.string()),
});

export const addLocalClientSchema = Yup.object().shape({
  shortId: Yup.string().optional(),
  isSocialAccount: Yup.boolean().optional(),
  socialAccount: socialAccountSchema.nullable(),
  deviceSetting: deviceSettingSchema.nullable(),
  accountSettings: accountSettingsSchema.nullable(),
  clientType: Yup.mixed().required().oneOf(["local", "external"]).required(),
  username: Yup.string().min(3, "a longer name is required").optional(),
  alias: Yup.mixed().required().oneOf(["username", "familyName", "givenName", "middleName", "displayName"]),
  displayName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  familyName: Yup.string().min(3, "need to add more characters").optional(),
  givenName: Yup.string().min(3, "need to add more characters").optional(),
  middleName: Yup.string().min(3, "need to add more characters").optional(),
  accountImageUrl: Yup.string(),
  email: Yup.string().email("email is not valid").optional(),
  locale: localeSchema.optional(),
  phoneNumbers: phoneNumbersSchema.optional(),
  imAddresses: imAddressesSchema.optional(),
  addresses: addressesSchema.optional(),
  desiredCurrencies: Yup.array().of(Yup.string()),
});

export const UpdateLocalClientSchema = Yup.object().shape({
  shortId: Yup.string().optional(),
  isSocialAccount: Yup.boolean().optional(),
  socialAccount: socialAccountSchema.optional(),
  deviceSetting: deviceSettingSchema.optional(),
  accountSettings: accountSettingsSchema.optional(),
  clientType: Yup.mixed().required().oneOf(["local", "external"]),
  username: Yup.string().min(3, "a longer name is required").required(),
  alias: Yup.mixed().required().oneOf(["username", "familyName", "givenName", "middleName", "displayName"]),
  displayName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  familyName: Yup.string().min(3, "need to add more characters").optional(),
  givenName: Yup.string().min(3, "need to add more characters").optional(),
  middleName: Yup.string().min(3, "need to add more characters").optional(),
  accountImageUrl: Yup.string(),
  email: Yup.string().email("email is not valid").optional(),
  locale: localeSchema.optional(),
  phoneNumbers: phoneNumbersSchema.optional(),
  imAddresses: imAddressesSchema.optional(),
  addresses: addressesSchema.optional(),
  socialAccounts: socialAccountsSchema.optional(),
  desiredCurrencies: Yup.array().of(Yup.string()),
});

export const addClientSchema = Yup.object().shape({
  shortId: Yup.string().required("this field is required"),
});
