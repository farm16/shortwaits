import { CreateBusinessUserDtoType } from "@shortwaits/shared-lib";
import * as Yup from "yup";

export const addBusinessUserSchema: (config: any) => Yup.SchemaOf<CreateBusinessUserDtoType> = config =>
  Yup.object().shape({
    hours: Yup.object().required(),
    alias: Yup.mixed().required().oneOf(["familyName", "givenName", "middleName", "displayName"]).optional(),
    displayName: Yup.string().min(3, "a longer name is required").required("this field is required"),
    middleName: Yup.string().min(3, "a longer name is required").optional(),
    familyName: Yup.string().min(3, "a longer name is required").optional(),
    givenName: Yup.string().min(3, "a longer name is required").optional(),
    accountImageUrl: Yup.string().optional(),
    phoneNumbers: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string(),
          number: Yup.string(), // validations is done via Phon
        })
      )
      .optional(),
    imAddresses: Yup.array()
      .of(
        Yup.object().shape({
          username: Yup.string(),
          service: Yup.string(),
        })
      )
      .optional(),
    addresses: Yup.array()
      .of(
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
      )
      .optional(),
    socialAccounts: Yup.array()
      .of(
        Yup.object().shape({
          kind: Yup.string(),
          uid: Yup.string(),
          username: Yup.string(),
        })
      )
      .optional(),
    birthday: Yup.string().optional(),
    email: Yup.string().email("Please enter a valid email").min(2, "Must be more than 10 characters").required("this field is required"),
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
