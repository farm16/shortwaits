import * as Yup from "yup";

export const addStaffSchema = Yup.object({
  hours: Yup.object().required(),
  alias: Yup.mixed().required().oneOf(["familyName", "givenName", "middleName", "displayName"]).optional(),
  displayName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  email: Yup.string().email("Please enter a valid email").min(2, "Must be more than 10 characters").optional(),
  middleName: Yup.string().min(3, "a longer name is required").optional(),
  familyName: Yup.string().min(3, "a longer name is required").optional(),
  givenName: Yup.string().min(3, "a longer name is required").optional(),
  accountImageUrl: Yup.string().optional(),
  phoneNumbers: Yup.array()
    .of(
      Yup.object({
        label: Yup.string(),
        number: Yup.string(), // validations is done via Phon
      })
    )
    .optional(),
  addresses: Yup.array()
    .of(
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
    )
    .optional(),
  socialAccounts: Yup.object({
    kind: Yup.string(),
    uid: Yup.string(),
    username: Yup.string(),
  }).optional(),
  birthday: Yup.string().optional(),
  desiredCurrencies: Yup.array().of(Yup.string()).optional(),
  locale: Yup.object()
    .shape({
      countryCode: Yup.string(),
      isRTL: Yup.boolean(),
      languageCode: Yup.string(),
      languageTag: Yup.string(),
    })
    .optional(),
});

export const updateStaffSchema = Yup.object({
  alias: Yup.string().oneOf(["username", "displayName"]).nullable(),
  username: Yup.string().min(3, "a longer name is required").nullable(),
  displayName: Yup.string().min(3, "a longer name is required").nullable(),
  familyName: Yup.string().min(3, "a longer name is required").nullable(),
  givenName: Yup.string().min(3, "a longer name is required").nullable(),
  middleName: Yup.string().min(3, "a longer name is required").nullable(),
  email: Yup.string().email("Please enter a valid email").min(2, "Must be more than 10 characters").nullable(),
  hours: Yup.object().nullable(),
  accountImageUrl: Yup.string().nullable(),
  primaryPhoneNumberLabel: Yup.string().nullable(),
  phoneNumbers: Yup.array()
    .of(
      Yup.object({
        label: Yup.string(),
        number: Yup.string(), // validations is done via Phon
      })
    )
    .nullable(),
  addresses: Yup.array()
    .of(
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
    )
    .nullable(),
  socialAccounts: Yup.object({
    kind: Yup.string(),
    uid: Yup.string(),
    username: Yup.string(),
  }).nullable(),
  birthday: Yup.string().nullable(),
  desiredCurrencies: Yup.array().of(Yup.string()).nullable(),
  locale: Yup.object()
    .shape({
      countryCode: Yup.string(),
      isRTL: Yup.boolean(),
      languageCode: Yup.string(),
      languageTag: Yup.string(),
    })
    .nullable(),
});
