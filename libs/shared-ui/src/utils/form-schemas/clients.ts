import * as Yup from "yup";

const deviceSettingSchema = Yup.object({
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

const accountSettingsSchema = Yup.object({
  isDarkModeEnabled: Yup.boolean(),
  isNotificationsEnabled: Yup.boolean(),
  isLocationEnabled: Yup.boolean(),
  isLocationShared: Yup.boolean(),
  isLocationSharedWithBusinesses: Yup.boolean(),
});

const socialAccountSchema = Yup.object({
  kind: Yup.string(),
  uid: Yup.string(),
  username: Yup.string(),
});

const localeSchema = Yup.object({
  countryCode: Yup.string(),
  isRTL: Yup.boolean(),
  languageCode: Yup.string(),
  languageTag: Yup.string(),
});

const phoneNumbersSchema = Yup.array().of(
  Yup.object({
    label: Yup.string(),
    number: Yup.string(), // validations is done via PhoneInput component
  })
);

const imAddressesSchema = Yup.array().of(
  Yup.object({
    username: Yup.string(),
    service: Yup.string(),
  })
);

const addressesSchema = Yup.array().of(
  Yup.object({
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
  Yup.object({
    kind: Yup.string(),
    uid: Yup.string(),
    username: Yup.string(),
  })
);

const billingSchema = Yup.object({
  membershipId: Yup.string(),
  membershipShortId: Yup.string(),
  membershipShortName: Yup.string(),
  status: Yup.string(),
  invoiceId: Yup.string(),
  isFaulty: Yup.boolean(),
  faultyReason: Yup.array().of(Yup.string()),
});

export const addLocalClientSchema = Yup.object({
  clientType: Yup.mixed().required().required(),
  username: Yup.string().min(3, "a longer name is required").optional(),
  alias: Yup.mixed().required().oneOf(["username", "familyName", "givenName", "middleName", "displayName"]),
  displayName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  familyName: Yup.string().min(3, "need to add more characters").optional(),
  givenName: Yup.string().min(3, "need to add more characters").optional(),
  middleName: Yup.string().min(3, "need to add more characters").optional(),
  accountImageUrl: Yup.string().optional(),
  email: Yup.string().email("email is not valid").optional(),
  imAddresses: imAddressesSchema.optional(),
  desiredCurrencies: Yup.array().of(Yup.string()).optional(),
  locale: localeSchema.optional(),
  phoneNumbers: phoneNumbersSchema.optional(),
  addresses: addressesSchema.optional(),

  isSocialAccount: Yup.boolean().optional(),
  socialAccount: socialAccountSchema.optional().nullable(),
  deviceSetting: deviceSettingSchema.optional().nullable(),
  accountSettings: accountSettingsSchema.optional().nullable(),
});

export const updateLocalClientSchema = Yup.object({
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

export const updateClientSchema = Yup.object({
  username: Yup.string().min(3, "a longer name is required").required(),
  displayName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  givenName: Yup.string().min(3, "need to add more characters").optional(),
  familyName: Yup.string().min(3, "need to add more characters").optional(),
  phoneNumbers: phoneNumbersSchema.optional(),
  email: Yup.string().email("email is not valid").optional(),
  addresses: addressesSchema.optional(),
  isSocialAccount: Yup.boolean().optional(),
  socialAccount: socialAccountSchema.optional(),
});

export const addClientSchema = Yup.object({
  shortId: Yup.string().required("this field is required"),
});
