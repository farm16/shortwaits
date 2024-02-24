import { Document } from "mongoose";
import { ObjectId } from "../common";
import { BusinessLabelsType } from "./business";
import { PaginatedModel } from "./helpers";

export type EventUrlsType = {
  type: string;
  isSupported: boolean;
  name: string;
  url: string;
};

export type EventLocationType = {
  address: string; // Full address of the location
  latitude: number; // Latitude of the location
  longitude: number; // Longitude of the location
};

export const eventStatusNames = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELED: "CANCELED",
  COMPLETED: "COMPLETED",
};
export type EventStatusName = keyof typeof eventStatusNames;

export const eventPaymentMethods = {
  CASH: "Cash",
  CREDIT_CARD: "Credit Card",
  ZELLE: "Zelle",
  PAYPAL: "Paypal",
  APPLE_PAY: "Apple Pay",
  GOOGLE_PAY: "Google Pay",
  BITCOIN: "Bitcoin",
  CASH_APP: "Cash App",
};
export const eventPaymentMethodsKeys = Object.keys(eventPaymentMethods);
export type EventPaymentMethodType = keyof typeof eventPaymentMethods;

export type EventType = {
  participantsIds: ObjectId[]; // Array of participant IDs // can be invites by client
  staffIds: ObjectId[]; // Array of business user IDs
  clientsIds: ObjectId[]; // Array of client user IDs
  localClientsIds: ObjectId[]; // Array of local client user IDs
  businessId: ObjectId; // ID of the associated business
  createdBy: ObjectId; // ID of the user who created the event
  updatedBy: ObjectId; // ID of the user who last updated the event
  leadClientId: ObjectId; // ID of the client who is the lead for the event

  name: string; // Name of the event
  description: string; // Description of the event
  eventImage: string; // URL or path to the event image
  serviceId: ObjectId; // ID of the associated service
  features: string[]; // Array of additional features or specifications for the event

  status: {
    statusCode: number; // Status code for the event
    statusName: EventStatusName; // Status name for the event
  };

  hasDuration: boolean; // Indicates if the event has no duration
  durationInMin: number; // Duration of the event in minutes

  //these need to be Date objects for db queries
  startTime: Date; // Start time of the event
  endTime: Date; // End time of the event
  expectedEndTime: Date; // Expected end time of the event
  canceled: boolean; // Indicates if the event is canceled
  cancellationReason: string; // Reason for event cancellation
  priceExpected: number; // Expected price for the event
  priceFinal: number; // Final price for the event
  isPublicEvent: boolean; // Indicates if the event is a group event
  repeat: boolean; // Indicates if the event is repeated
  paymentMethod: EventPaymentMethodType;
  payment: {
    paymentProcessedOn: string; // Date when the payment was processed ISO 8601 format
    paymentMethodId?: string; // Stripe payment method ID
    amount: number; // Payment amount
    currency: string; // Payment currency (e.g., "USD", "EUR", "GBP")
    description?: string; // Payment description or purpose
    statementDescriptor?: string; // Statement descriptor for the payment (appears on the customer's credit card statement)
    metadata?: { [key: string]: string }; // Metadata associated with the payment (optional)
    // Additional Stripe-specific properties as needed
  };

  notes: string; // Additional notes or comments about the event
  labels: BusinessLabelsType; // Array of labels or tags for the event

  urls: {
    type: string; // Type or category of the URL
    isSupported: boolean; // Indicates if the URL is supported
    name: string; // Name or label for the URL
    url: string; // URL itself
  }[];

  deleted: boolean; // Indicates if the event is deleted

  location: EventLocationType;

  attendeeLimit: number; // Maximum participant limit for the event (added field)
  registrationDeadlineTime: string; // Deadline for event registration (added field)
  registrationFee: number; // Registration fee for the event (added field)
  discountAmount: number; // Discount for the event
  availableDiscountCodes: DiscountType[]; // Discount code for the event
  selectedDiscountCode: DiscountType;
};

export type DiscountType = {
  code: string;
  discount: number | null;
  description: string;
  params?: {
    minPrice: number;
    maxPrice: number;
    minDuration: number;
    maxDuration: number;
    minParticipants: number;
    maxParticipants: number;
    minRegistrationFee: number;
    maxRegistrationFee: number;
    minAttendeeLimit: number;
    maxAttendeeLimit: number;
    minDiscount: number;
    maxDiscount: number;
  };
};

export type EventDocType = EventType & Document;
export type EventsDocType = EventDocType[];

export type EventModelType = PaginatedModel<EventDocType>;