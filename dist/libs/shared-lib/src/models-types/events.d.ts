import { Document } from "mongoose";
import { PaginatedModel } from "./helpers";
import { ObjectId } from "../common-types/index";
import { BusinessLabelsType } from "./business";
export type EventUrlsType = {
    type: string;
    isSupported: boolean;
    name: string;
    url: string;
};
export type EventLocationType = {
    address: string;
    latitude: number;
    longitude: number;
};
export declare const eventStatusNames: {
    PENDING: string;
    APPROVED: string;
    REJECTED: string;
    CANCELED: string;
    COMPLETED: string;
};
export type EventStatusName = keyof typeof eventStatusNames;
export declare const eventPaymentMethods: {
    CASH: string;
    CREDIT_CARD: string;
    ZELLE: string;
    PAYPAL: string;
    APPLE_PAY: string;
    GOOGLE_PAY: string;
    BITCOIN: string;
    CASH_APP: string;
};
export declare const eventPaymentMethodsKeys: string[];
export type EventPaymentMethodType = keyof typeof eventPaymentMethods;
export type EventType = {
    participantsIds: ObjectId[];
    staffIds: ObjectId[];
    clientsIds: ObjectId[];
    businessId: ObjectId;
    createdBy: ObjectId;
    updatedBy: ObjectId;
    leadClientId: ObjectId;
    name: string;
    description: string;
    eventImage: string;
    serviceId: ObjectId;
    features: string[];
    status: {
        statusCode: number;
        statusName: EventStatusName;
    };
    hasNoDuration: boolean;
    durationInMin: number;
    startTime: Date;
    endTime: Date;
    expectedEndTime: Date;
    canceled: boolean;
    cancellationReason: string;
    isPublicEvent: boolean;
    repeat: boolean;
    paymentMethod: EventPaymentMethodType;
    priceExpected: number;
    priceFinal: number;
    payment: {
        paymentProcessedOn: string;
        paymentMethodId?: string;
        amount: number;
        currency: string;
        description?: string;
        statementDescriptor?: string;
        metadata?: {
            [key: string]: string;
        };
    };
    notes: string;
    labels: BusinessLabelsType;
    urls: {
        type: string;
        isSupported: boolean;
        name: string;
        url: string;
    }[];
    deleted: boolean;
    location: EventLocationType;
    attendeeLimit: number;
    registrationDeadlineTime: string;
    registrationFee: number;
};
export type EventDocType = EventType & Document;
export type EventsDocType = EventDocType[];
export type EventModelType = PaginatedModel<EventDocType>;
