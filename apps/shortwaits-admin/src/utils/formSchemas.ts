import { EventDtoType } from "@shortwaits/shared-types";
import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const addEvent = Yup.object().shape({
  paymentMethod: Yup.string().oneOf([
    "CREDIT CARD",
    "DEBIT CARD",
    "BANK TRANSFER",
    "PAYPAL",
    "APPLE PAY",
    "GOOGLE PAY",
    "BITCOIN",
    "AMAZON PAY",
    "CASH",
    "ZELLE",
    "CASH APP",
  ]),
  participantsIds: Yup.array().of(Yup.string()),
  urls: Yup.array().of(
    Yup.object().shape({
      type: Yup.string(),
      isSupported: Yup.boolean(),
      name: Yup.string(),
      url: Yup.string().url(),
    })
  ),
  location: Yup.object().shape({}),
  attendeeLimit: Yup.number(),
  registrationFee: Yup.number(),
  hasNoDuration: Yup.boolean(),
  eventImage: Yup.string().url(),
  name: Yup.string(),
  description: Yup.string(),
  features: Yup.array().of(Yup.string()),
  durationInMin: Yup.number(),
  priceExpected: Yup.number().notRequired(),
  isGroupEvent: Yup.boolean().notRequired(),
  repeat: Yup.boolean().notRequired(),
  // payment: Yup.mixed(
  //   object().shape({
  //     paymentMethodId: Yup.string(),
  //     amount: Yup.number(),
  //     currency: Yup.string(),
  //     description: Yup.string(),
  //     statementDescriptor: Yup.string(),
  //     metadata: Yup.object().nullable(),
  //   })
  // ).notRequired(),
  notes: Yup.string().notRequired(),
  labels: Yup.array().of(Yup.string()).notRequired(),
  registrationDeadlineTime: Yup.string().notRequired(),
  leadClientId: Yup.string().notRequired(),
  serviceId: Yup.string(),
  businessId: Yup.string(),
  clientsIds: Yup.array().of(Yup.string()),
  staffIds: Yup.array().of(Yup.string()),
  startTime: Yup.string(),
  expectedEndTime: Yup.string(),
} as Record<keyof EventDtoType, any>);

export const formSchemas = {
  addService: Yup.object().shape({
    serviceName: Yup.string()
      .min(3, "a longer name is required")
      .required("this field is required"),
    price: Yup.string(),
  }),
  addClient: Yup.object().shape({
    displayName: Yup.string()
      .min(3, "a longer name is required")
      .required("this field is required"),
    accountImageUrl: Yup.string(),
    phoneNumber1: Yup.string().matches(
      phoneRegExp,
      "Phone number is not valid"
    ),
    phoneNumber2: Yup.string().matches(
      phoneRegExp,
      "Phone number is not valid"
    ),
    addresses1: Yup.string(),
    addresses2: Yup.string(),
    city: Yup.string(),
    region: Yup.string(),
    state: Yup.string(),
    postCode: Yup.string(),
    country: Yup.string(),
    year: Yup.number(),
    month: Yup.number(),
    day: Yup.number(),
    email: Yup.string()
      .email("Please enter a valid email")
      .min(2, "Must be more than 10 characters")
      .required("this field is required"),
  }),
  addStaff: Yup.object().shape({
    displayName: Yup.string()
      .min(3, "a longer name is required")
      .required("this field is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .min(2, "Must be more than 10 characters")
      .required("this field is required"),
    phoneNumber1: Yup.string()
      .min(3, "invalid phone number")
      .required("this field is required"),
    accountImageUrl: Yup.string(),
    addresses1: Yup.string(),
    addresses2: Yup.string(),
    city: Yup.string(),
    region: Yup.string(),
    state: Yup.string(),
    postCode: Yup.string(),
    country: Yup.string(),
    year: Yup.number(),
    month: Yup.number(),
    day: Yup.number(),
  }),
  addEvent,
  onboarding1: Yup.object().shape({
    businessShortName: Yup.string()
      .min(3, "a longer name is required")
      .required("this field is required"),
    businessDescription: Yup.string()
      .max(140)
      .required("this field is required"),
  }),
  signInSchema: Yup.object().shape({
    email: Yup.string().email("invalid email").required("no email provided."),
    password: Yup.string().required("no password provided."),
  }),
  signUpSchema: Yup.object().shape({
    email: Yup.string().email("invalid email").required("no email provided."),
    password: Yup.string()
      .required("no password provided.")
      .min(6, "password is too short - should be 8 chars minimum.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "must contain 6 characters, one uppercase, one lowercase and one number."
      ),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "passwords must match")
      .required("required"),
  }),
};
