import { Document } from "mongoose";
import {
  BusinessAccountType,
  BusinessBookingConfigType,
  BusinessHoursType,
  BusinessLabelType,
  BusinessLocationType,
  BusinessTaggedClientType,
  BusinessVideoConferenceType,
  BusinessWebConfigType,
  CurrencyType,
  ObjectId,
  PaginatedModel,
} from "../../../";

export type BusinessLabelsType = BusinessLabelType[];

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
  localClients: ObjectId[];
  taggedClients: BusinessTaggedClientType[];
  accountType: BusinessAccountType;
  isWebBookingEnabled: boolean;
  isSmsNotificationEnabled: boolean;
  isAppNotificationEnabled: boolean;
  videoConferences: BusinessVideoConferenceType[];
  isVideoConferenceEnabled: boolean;
  supportEmail?: string;
  supportPhone?: string;
  isDisabled: boolean;
  deliveryInfo?: string;
  reservations?: ObjectId[];
  paymentMethods?: string[];
  web?: BusinessWebConfigType;
  booking?: BusinessBookingConfigType;
};

type BusinessDocType = BusinessType & Document;

export type BusinessModelType = PaginatedModel<BusinessDocType>;
