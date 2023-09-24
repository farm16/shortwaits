import {
  BusinessDtoType,
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

export const updateBusinessSchema: Yup.SchemaOf<BusinessDtoType> = Yup.object().shape({});
