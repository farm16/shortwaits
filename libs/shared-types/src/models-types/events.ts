import { Document } from "mongoose";
import { PaginatedModel } from "./helpers";
import { ObjectId } from "../common/index";

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

export type EventStatusName =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELED"
  | "COMPLETED";

export type EventPaymentMethodType =
  | "CREDIT CARD"
  | "DEBIT CARD"
  | "BANK TRANSFER"
  | "PAYPAL"
  | "APPLE PAY"
  | "GOOGLE PAY"
  | "BITCOIN"
  | "AMAZON PAY"
  | "CASH"
  | "ZELLE"
  | "CASH APP";

export type EventType = {
  participantsIds: ObjectId[]; // Array of participant IDs // can be invites by client
  staffIds: ObjectId[]; // Array of staff IDs
  clientsIds: ObjectId[]; // Array of client IDs
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

  hasNoDuration: boolean; // Indicates if the event has no duration
  durationInMin: number; // Duration of the event in minutes
  startTime: Date; // Start time of the event
  endTime: Date; // End time of the event
  expectedEndTime: Date; // Expected end time of the event
  priceExpected: number; // Expected price for the event
  priceFinal: number; // Final price for the event
  canceled: boolean; // Indicates if the event is canceled
  cancellationReason: string; // Reason for event cancellation

  isGroupEvent: boolean; // Indicates if the event is a group event
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
  labels: string[]; // Array of labels or tags for the event

  urls: {
    type: string; // Type or category of the URL
    isSupported: boolean; // Indicates if the URL is supported
    name: string; // Name or label for the URL
    url: string; // URL itself
  }[];

  deleted: boolean; // Indicates if the event is deleted

  location: EventLocationType;

  attendeeLimit: number; // Maximum participant limit for the event (added field)
  registrationDeadlineTime: Date; // Deadline for event registration (added field)
  registrationFee: number; // Registration fee for the event (added field)
  // Additional metadata fields can be added here as needed
};

export type EventDocType = EventType & Document;
export type EventsDocType = EventDocType[];

export type EventModelType = PaginatedModel<EventDocType>;
