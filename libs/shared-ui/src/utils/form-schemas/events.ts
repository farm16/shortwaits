import { EventPaymentMethodType, eventPaymentMethods } from "@shortwaits/shared-lib";
import * as Yup from "yup";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const paymentMethodSchema: Yup.SchemaOf<EventPaymentMethodType> = Yup.string().required().oneOf(Object.keys(eventPaymentMethods));

const discountCodeSchema = Yup.object().shape({
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

const paymentSchema = Yup.object().shape({
  paymentProcessedOn: Yup.string(),
  paymentMethodId: Yup.string(),
  amount: Yup.number(),
  currency: Yup.string(),
  description: Yup.string(),
  statementDescriptor: Yup.string(),
  metadata: Yup.object(),
});

export const createEventSchema = Yup.object().shape({
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
  hasDuration: Yup.boolean(),
  eventImage: Yup.string().url(),
  name: Yup.string(),
  description: Yup.string(),
  features: Yup.array().of(Yup.string()),
  durationInMin: Yup.number(),
  priceExpected: Yup.number().notRequired(),
  isPublicEvent: Yup.boolean().notRequired(),
  repeat: Yup.boolean().notRequired(),
  notes: Yup.string().notRequired(),
  labels: Yup.array().of(Yup.object()).optional(),
  registrationDeadlineTime: Yup.string().optional(),
  leadClientId: Yup.string().notRequired(),
  serviceId: Yup.string(),
  businessId: Yup.string(),
  clientsIds: Yup.array().of(Yup.string()),
  staffIds: Yup.array().of(Yup.string()),
  startTime: Yup.string(),
  expectedEndTime: Yup.string(),
  localClientsIds: Yup.array().of(Yup.string()),
  endTime: Yup.string(),
  canceled: Yup.boolean(),
  priceFinal: Yup.number(),
  payment: Yup.object()
    .shape({
      paymentProcessedOn: Yup.string(),
      paymentMethodId: Yup.string(),
      amount: Yup.number(),
      currency: Yup.string(),
      description: Yup.string(),
      statementDescriptor: Yup.string(),
      metadata: Yup.object(),
    })
    .nullable(),
  cancellationReason: Yup.string().optional(),
  availableDiscountCodes: Yup.array().of(discountCodeSchema).optional(),
  selectedDiscountCode: discountCodeSchema.nullable(),
  discountAmount: Yup.number().optional(),
});

export const updateEventSchema = Yup.object().shape({
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
  hasDuration: Yup.boolean(),
  eventImage: Yup.string().url(),
  name: Yup.string(),
  description: Yup.string(),
  features: Yup.array().of(Yup.string()),
  durationInMin: Yup.number(),
  priceExpected: Yup.number().notRequired(),
  isPublicEvent: Yup.boolean().notRequired(),
  repeat: Yup.boolean().notRequired(),
  notes: Yup.string().notRequired(),
  labels: Yup.array().of(Yup.object()).optional(),
  registrationDeadlineTime: Yup.string().optional(),
  leadClientId: Yup.string().notRequired(),
  serviceId: Yup.string(),
  businessId: Yup.string(),
  clientsIds: Yup.array().of(Yup.string()),
  staffIds: Yup.array().of(Yup.string()),
  startTime: Yup.string(),
  expectedEndTime: Yup.string(),
  localClientsIds: Yup.array().of(Yup.string()),
  endTime: Yup.string(),
  canceled: Yup.boolean(),
  priceFinal: Yup.number(),
  payment: Yup.object()
    .shape({
      paymentProcessedOn: Yup.string(),
      paymentMethodId: Yup.string(),
      amount: Yup.number(),
      currency: Yup.string(),
      description: Yup.string(),
      statementDescriptor: Yup.string(),
      metadata: Yup.object(),
    })
    .optional(),
  cancellationReason: Yup.string().optional(),
  availableDiscountCodes: Yup.array().of(discountCodeSchema).optional(),
  selectedDiscountCode: discountCodeSchema.optional(),
  discountAmount: Yup.number().optional(),
});
