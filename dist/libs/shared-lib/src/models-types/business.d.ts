import { Document } from "mongoose";
import { EmojiType, ObjectId } from "../common-types";
import { BusinessHoursType, BusinessLocationType, CurrencyType, PaginatedModel } from "./helpers";
export type BusinessLabelType = {
    name: string;
    description: string;
    isFavorite: boolean;
    emojiShortName: EmojiType;
};
export type BusinessLabelsType = BusinessLabelType[];
export type AccountType = "free" | "student" | "basic" | "trial" | "business" | "premium" | "enterprise" | "partner";
export type BusinessType = {
    shortId: string;
    email: string;
    labels: BusinessLabelsType;
    admins: ObjectId[] /** @todo this might not always be received via the API why should it ? */;
    superAdmins: ObjectId[] /** @todo this might not always be received via the API why should it ? */;
    backgroundAdmins: ObjectId[] /** @todo this might not always be received via the API why should it ? */;
    staff: ObjectId[] /** @todo every BusinessUserType in the Shortwaits admin app is a staff */;
    categories: ObjectId[];
    services: ObjectId[];
    events: ObjectId[];
    description: string;
    currency: CurrencyType;
    country: string;
    phone1: string;
    shortName: string;
    longName: string;
    hours: BusinessHoursType;
    location: BusinessLocationType;
    isRegistrationCompleted: boolean;
    deleted: boolean;
    createdBy: ObjectId;
    updatedBy: ObjectId;
    clients: ObjectId[];
    taggedClients: [
        {
            clientId: ObjectId;
            services: ObjectId[];
            tags: string[];
        }
    ];
    accountType: AccountType;
    isWebBookingEnabled: boolean;
    isSmsNotificationEnabled: boolean;
    isAppNotificationEnabled: boolean;
    videoConference: {
        isActive: boolean;
        url: string;
    }[];
    isVideoConferenceEnabled: boolean;
    supportEmail?: string;
    supportPhone?: string;
    isDisabled: boolean;
    deliveryInfo?: string;
    reservations?: ObjectId[];
    paymentMethods?: string[];
    web?: {
        isActive: boolean;
        baseUrl: string;
        bannerImageUrl: string;
        logoImageUrl: string;
        faviconImageUrl: string;
        primaryColor: string;
        secondaryColor: string;
        accentColor: string;
        notificationMessage: string;
    };
    booking?: {
        allowBooking: boolean;
        allowRescheduling: boolean;
        allowCancellation: boolean;
        allowPayment: boolean;
        allowCheckIn: boolean;
        allowCheckOut: boolean;
        allowNoShow: boolean;
        allowWaitlist: boolean;
    };
};
type BusinessDocType = BusinessType & Document;
export type BusinessModelType = PaginatedModel<BusinessDocType>;
export {};
