import {
  CreateEventDtoType,
  EventPaymentMethodType,
  UpdateEventDtoType,
  eventPaymentMethods,
} from "@shortwaits/shared-lib";
import * as Yup from "yup";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const paymentMethodSchema: Yup.SchemaOf<EventPaymentMethodType> = Yup.string()
  .required()
  .oneOf(Object.keys(eventPaymentMethods));

export const createEventSchema: Yup.SchemaOf<CreateEventDtoType> = Yup.object().shape({
  paymentMethod: paymentMethodSchema,
  participantsIds: Yup.array().of(Yup.string()),
  urls: Yup.array()
    .optional()
    .of(
      Yup.object().shape({
        type: Yup.string(),
        isSupported: Yup.boolean(),
        name: Yup.string(),
        url: Yup.string().url(),
      })
    ),
  location: Yup.object().optional().shape({
    address: Yup.string(),
    latitude: Yup.number(),
    longitude: Yup.number(),
  }),
  attendeeLimit: Yup.number(),
  registrationFee: Yup.number(),
  hasNoDuration: Yup.boolean(),
  eventImage: Yup.string().url(),
  name: Yup.string().required(),
  description: Yup.string().optional(),
  features: Yup.array().of(Yup.string()),
  durationInMin: Yup.number(),
  priceExpected: Yup.number().optional(),
  isPublicEvent: Yup.boolean().optional(),
  repeat: Yup.boolean().optional(),
  notes: Yup.string().optional(),
  labels: Yup.array().of(Yup.object()).optional(),
  registrationDeadlineTime: Yup.string().optional(),
  leadClientId: Yup.string().optional(),
  serviceId: Yup.string().required("a service is required for an event"),
  businessId: Yup.string(),
  clientsIds: Yup.array().of(Yup.string()),
  staffIds: Yup.array().of(Yup.string()),
  startTime: Yup.string(),
  expectedEndTime: Yup.string(),
});

export const updateEventSchema: Yup.SchemaOf<UpdateEventDtoType> = Yup.object().shape({
  paymentMethod: paymentMethodSchema,
  participantsIds: Yup.array().of(Yup.string()),
  urls: Yup.array().of(
    Yup.object().shape({
      type: Yup.string(),
      isSupported: Yup.boolean(),
      name: Yup.string(),
      url: Yup.string().url(),
    })
  ),
  location: Yup.object().optional().shape({
    address: Yup.string(),
    latitude: Yup.number(),
    longitude: Yup.number(),
  }),
  attendeeLimit: Yup.number(),
  registrationFee: Yup.number(),
  hasNoDuration: Yup.boolean(),
  eventImage: Yup.string().url(),
  name: Yup.string(),
  description: Yup.string(),
  features: Yup.array().of(Yup.string()),
  durationInMin: Yup.number(),
  priceExpected: Yup.number().notRequired(),
  isPublicEvent: Yup.boolean().notRequired(),
  repeat: Yup.boolean().notRequired(),
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
});
