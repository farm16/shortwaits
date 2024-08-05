import { EventPaymentMethodType, eventPaymentMethods } from "@shortwaits/shared-lib";
import * as Yup from "yup";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const paymentMethodSchema: Yup.ObjectSchema<EventPaymentMethodType> = Yup.string().required().oneOf(Object.keys(eventPaymentMethods));

const discountCodeSchema = Yup.object({
  code: Yup.string(),
  discount: Yup.number().nullable(),
  description: Yup.string().notRequired(),
  params: Yup.object()
    .shape({
      minPrice: Yup.number(),
      maxPrice: Yup.number(),
      minDuration: Yup.number(),
      maxDuration: Yup.number(),
      minParticipants: Yup.number(),
      maxParticipants: Yup.number(),
      minRegistrationFee: Yup.number(),
      maxRegistrationFee: Yup.number(),
      minAttendeeLimit: Yup.number(),
      maxAttendeeLimit: Yup.number(),
      minDiscount: Yup.number(),
      maxDiscount: Yup.number(),
    })
    .notRequired(),
});

const paymentSchema = Yup.object({
  paymentProcessedOn: Yup.string(),
  paymentMethodId: Yup.string(),
  amount: Yup.number(),
  currency: Yup.string(),
  description: Yup.string(),
  statementDescriptor: Yup.string(),
  metadata: Yup.object(),
});

const locationSchema = Yup.object({
  name: Yup.string(),
  address: Yup.string(),
  address2: Yup.string().nullable().notRequired(),
  city: Yup.string(),
  state: Yup.string(),
  country: Yup.string(),
  postalCode: Yup.string(),
  latitude: Yup.number(),
  longitude: Yup.number(),
});

const urlSchema = Yup.object({
  type: Yup.string(),
  isSupported: Yup.boolean(),
  name: Yup.string(),
  url: Yup.string().url(),
});

export const createEventSchema = Yup.object({
  paymentMethod: paymentMethodSchema,
  participantsIds: Yup.array().of(Yup.string()),
  staffIds: Yup.array().of(Yup.string()),
  clientsIds: Yup.array().of(Yup.string()),
  localClientsIds: Yup.array().of(Yup.string()),
  location: locationSchema.nullable().optional(),
  attendeeLimit: Yup.number(),
  registrationFee: Yup.number(),
  hasDuration: Yup.boolean(),
  eventImage: Yup.string().url(),
  name: Yup.string(),
  description: Yup.string(),
  features: Yup.array().of(Yup.string()),
  durationInMin: Yup.number(),
  priceExpected: Yup.number().notRequired(),
  isPublicEvent: Yup.boolean().notRequired(),
  repeat: Yup.boolean().notRequired(),
  registrationDeadlineTime: Yup.string().optional(),
  leadClientId: Yup.string().notRequired(),
  serviceId: Yup.string(),
  businessId: Yup.string(),
  startTime: Yup.string(),
  expectedEndTime: Yup.string(),
  endTime: Yup.string(),
  canceled: Yup.boolean(),
  priceFinal: Yup.number(),
  payment: paymentSchema.nullable().optional(),
  notes: Yup.string().notRequired(),
  labels: Yup.array().of(Yup.object()).optional(),
  urls: Yup.array().of(urlSchema).optional(),
  cancellationReason: Yup.string().optional(),
  availableDiscountCodes: Yup.array().of(discountCodeSchema).optional(),
  discountAmount: Yup.number().optional(),
  selectedDiscountCode: discountCodeSchema.nullable(),
});

export const updateEventSchema = Yup.object({
  _id: Yup.string().nullable().notRequired(),
  createdAt: Yup.string().nullable().notRequired(),
  updatedAt: Yup.string().nullable().notRequired(),
  __v: Yup.number().nullable().notRequired(),

  shortId: Yup.string().nullable().notRequired(),
  participantsIds: Yup.array().of(Yup.string()),
  staffIds: Yup.array().of(Yup.string()),
  clientsIds: Yup.array().of(Yup.string()),
  localClientsIds: Yup.array().of(Yup.string()),
  businessId: Yup.string(),
  createdBy: Yup.string().nullable().notRequired(), // ID of the user who created the event
  updatedBy: Yup.string().nullable().notRequired(), // ID of the user who last updated the event
  leadClientId: Yup.string().nullable().notRequired(),

  name: Yup.string(),
  description: Yup.string(),
  eventImage: Yup.string().url(),
  serviceId: Yup.string().nullable().notRequired(),
  features: Yup.array().of(Yup.string()),

  status: Yup.object({
    statusCode: Yup.number(),
    statusName: Yup.string(),
  }),

  hasDuration: Yup.boolean(),
  durationInMin: Yup.number(),

  startTime: Yup.string(),
  endTime: Yup.string().optional().nullable(),
  expectedEndTime: Yup.string(),
  canceled: Yup.boolean(),
  cancellationReason: Yup.string().optional(),
  priceExpected: Yup.number().notRequired(),
  priceFinal: Yup.number(),
  isPublicEvent: Yup.boolean().notRequired(),
  repeat: Yup.boolean().notRequired(),
  paymentMethod: paymentMethodSchema,
  payment: paymentSchema.optional().nullable(),

  notes: Yup.string().notRequired(),
  labels: Yup.array().of(Yup.object()).optional(),

  urls: Yup.array().of(urlSchema).optional(),

  deleted: Yup.boolean(),

  location: locationSchema.nullable().optional(),

  attendeeLimit: Yup.number(),
  registrationDeadlineTime: Yup.string().optional(),
  registrationFee: Yup.number(),
  discountAmount: Yup.number().optional(),
  availableDiscountCodes: Yup.array().of(discountCodeSchema).optional(),
  selectedDiscountCode: discountCodeSchema.optional(),
});
