import { CreateBusinessUserDtoType, CreateClientUserDtoType } from "@shortwaits/shared-lib";
import * as Yup from "yup";

export const createClientUserSchema: Yup.SchemaOf<CreateClientUserDtoType> = Yup.object().shape({
  clientType: Yup.mixed().required().oneOf(["local", "external"]),
  username: Yup.string().min(3, "a longer name is required").optional(),
  alias: Yup.mixed().required().oneOf(["username", "familyName", "givenName", "middleName", "displayName"]),
  displayName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  familyName: Yup.string().min(3, "need to add more characters").optional(),
  givenName: Yup.string().min(3, "need to add more characters").optional(),
  middleName: Yup.string().min(3, "need to add more characters").optional(),
  accountImageUrl: Yup.string(),
  email: Yup.string().email("email is not valid").required("this field is required"),
  password: Yup.string().min(8, "password must be at least 8 characters").optional(), // this is not required for clientType: "local"
  locale: Yup.object().shape({
    countryCode: Yup.string().required("this field is required"),
    isRTL: Yup.boolean().required("this field is required"),
    languageCode: Yup.string().required("this field is required"),
    languageTag: Yup.string().required("this field is required"),
  }),
  phoneNumbers: Yup.array().of(
    Yup.object().shape({
      label: Yup.string(),
      number: Yup.string(), // validations is done via PhoneInput component
    })
  ),
  imAddresses: Yup.array().of(
    Yup.object().shape({
      username: Yup.string(),
      service: Yup.string().email("email is not valid"),
    })
  ),
  addresses: Yup.array().of(
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
  ),
  socialAccounts: Yup.array().of(
    Yup.object().shape({
      kind: Yup.string(),
      uid: Yup.string(),
      username: Yup.string(),
    })
  ),
  birthday: Yup.string(),
  desiredCurrencies: Yup.array().of(Yup.string()),
});

export const createBusinessUserSchema: Yup.SchemaOf<CreateBusinessUserDtoType> = Yup.object().shape({
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
  email: Yup.string()
    .email("Please enter a valid email")
    .min(2, "Must be more than 10 characters")
    .required("this field is required"),
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

export const updateClientUserSchema: Yup.SchemaOf<CreateClientUserDtoType> = Yup.object().shape({
  clientType: Yup.mixed().required().oneOf(["local", "external"]),
  username: Yup.string().min(3, "a longer name is required").required("this field is required"),
  alias: Yup.mixed().required().oneOf(["username", "familyName", "givenName", "middleName", "displayName"]),
  displayName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  familyName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  givenName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  middleName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  accountImageUrl: Yup.string(),
  email: Yup.string().email("email is not valid").required("this field is required"),
  password: Yup.string().min(8, "password must be at least 8 characters").required("this field is required"),
  locale: Yup.object().shape({
    countryCode: Yup.string().required("this field is required"),
    isRTL: Yup.boolean().required("this field is required"),
    languageCode: Yup.string().required("this field is required"),
    languageTag: Yup.string().required("this field is required"),
  }),
  phoneNumbers: Yup.array().of(
    Yup.object().shape({
      label: Yup.string(),
      number: Yup.string(), // validations is done via Phon
    })
  ),
  imAddresses: Yup.array().of(
    Yup.object().shape({
      username: Yup.string(),
      service: Yup.string().email("email is not valid"),
    })
  ),
  addresses: Yup.array().of(
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
  ),
  socialAccounts: Yup.array().of(
    Yup.object().shape({
      kind: Yup.string(),
      uid: Yup.string(),
      username: Yup.string(),
    })
  ),
  birthday: Yup.string(),
  desiredCurrencies: Yup.array().of(Yup.string()),
});

export const updateBusinessUserSchema: Yup.SchemaOf<CreateBusinessUserDtoType> = Yup.object().shape({
  alias: Yup.mixed().required().oneOf(["familyName", "givenName", "middleName", "displayName"]),
  displayName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  middleName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  familyName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  givenName: Yup.string().min(3, "a longer name is required").required("this field is required"),
  accountImageUrl: Yup.string(),
  phoneNumbers: Yup.array().of(
    Yup.object().shape({
      label: Yup.string(),
      number: Yup.string(), // validations is done via Phon
    })
  ),
  imAddresses: Yup.array().of(
    Yup.object().shape({
      username: Yup.string(),
      service: Yup.string(),
    })
  ),
  addresses: Yup.array().of(
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
  ),
  socialAccounts: Yup.array().of(
    Yup.object().shape({
      kind: Yup.string(),
      uid: Yup.string(),
      username: Yup.string(),
    })
  ),
  birthday: Yup.string(),
  email: Yup.string()
    .email("Please enter a valid email")
    .min(2, "Must be more than 10 characters")
    .required("this field is required"),
  password: Yup.string().min(6, "Must be more than 6 characters").required("this field is required"),
  desiredCurrencies: Yup.array().of(Yup.string()),
  locale: Yup.object().shape({
    countryCode: Yup.string(),
    isRTL: Yup.boolean(),
    languageCode: Yup.string(),
    languageTag: Yup.string(),
  }),
});
