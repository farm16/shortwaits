import { eventPaymentMethods, EventPaymentMethodType, UpdateBusinessDtoType } from "@shortwaits/shared-lib";
import * as Yup from "yup";
import { hoursOptional } from "./commons";

// @ts-ignore
const paymentMethodSchema: Yup.Schema<EventPaymentMethodType> = Yup.string().required().oneOf(Object.keys(eventPaymentMethods));

export const updateBusinessSchema: Yup.Schema<UpdateBusinessDtoType> = Yup.object({
  shortName: Yup.string().optional().nullable(),
  description: Yup.string().optional().nullable(),
  events: Yup.array().optional().nullable(),
  services: Yup.array().optional().nullable(),
  email: Yup.string().email().optional().nullable(),
  labels: Yup.array().optional().nullable(),
  staff: Yup.array().optional().nullable(),
  categories: Yup.array().optional().nullable(),
  currency: Yup.object().optional().nullable(),
  country: Yup.string().optional().nullable(),
  phone1: Yup.string().optional().nullable(),
  longName: Yup.string().optional().nullable(),
  hours: hoursOptional,
  location: Yup.object().optional().nullable({
    formattedAddress: Yup.string().optional().nullable(),
    streetAddress: Yup.string().optional().nullable(),
    city: Yup.string().optional().nullable(),
    state: Yup.string().optional().nullable(),
    postalCode: Yup.string().optional().nullable(),
    country: Yup.string().optional().nullable(),
    coordinates: Yup.array(),
  }),
  clients: Yup.array().optional().nullable(),
  taggedClients: Yup.array().optional().nullable(),
  isWebBookingEnabled: Yup.boolean().optional().nullable(),
  isSmsNotificationEnabled: Yup.boolean().optional().nullable(),
  isAppNotificationEnabled: Yup.boolean().optional().nullable(),
  videoConferences: Yup.array().optional().nullable(),
  isVideoConferenceEnabled: Yup.boolean().optional().nullable(),
  web: Yup.object().optional().nullable({
    isActive: Yup.boolean(),
    baseUrl: Yup.string().url(),
    bannerImageUrl: Yup.string().url(),
    logoImageUrl: Yup.string().url(),
    faviconImageUrl: Yup.string().url(),
    primaryColor: Yup.string(),
    secondaryColor: Yup.string(),
    accentColor: Yup.string(),
    notificationMessage: Yup.string(),
  }),
  booking: Yup.object().optional().nullable({
    allowBooking: Yup.boolean(),
    allowRescheduling: Yup.boolean(),
    allowCancellation: Yup.boolean(),
    allowPayment: Yup.boolean(),
    allowCheckIn: Yup.boolean(),
    allowCheckOut: Yup.boolean(),
    allowNoShow: Yup.boolean(),
    allowWaitlist: Yup.boolean(),
  }),
  supportEmail: Yup.string().optional().nullable(),
  supportPhone: Yup.string().optional().nullable(),
  deliveryInfo: Yup.string().optional().nullable(),
  reservations: Yup.array().optional().nullable(),
});
