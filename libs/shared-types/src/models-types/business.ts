import { Document } from "mongoose";

import { ObjectId } from "../common";

import {
  BusinessHoursType,
  BusinessLocationType,
  CurrencyType,
  PaginatedModel,
} from "./helpers";

export enum AccountType {
  FREE = "free",
  STUDENT = "student",
  BASIC = "basic",

  TRIAL = "trial",
  BUSINESS = "business",
  PREMIUM = "premium",
  ENTERPRISE = "enterprise",
  PARTNER = "partner",
}

export type BusinessType = {
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
  /**
   * @todo !!!
   * */
  deliveryInfo?: any;
  reservations?: ObjectId[];
  paymentMethods?: any;
  web?: {
    isActive: boolean;
  };
};

type BusinessDocType = BusinessType & Document;

export type BusinessModelType = PaginatedModel<BusinessDocType>;
