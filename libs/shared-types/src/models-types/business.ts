import { Document } from "mongoose";

import { ObjectId } from "../common";

import {
  BusinessHoursType,
  BusinessLocationType,
  CurrencyType,
  PaginatedModel,
} from "./helpers";

export type BusinessType = {
  admins: ObjectId[] /** @todo this might not always be received via the API why should it ? */;
  superAdmins: ObjectId[] /** @todo this might not always be received via the API why should it ? */;
  backgroundAdmins: ObjectId[] /** @todo this might not always be received via the API why should it ? */;
  staff: ObjectId[] /** @todo every UserType in the Shortwaits admin app is a staff */;
  categories: ObjectId[];
  services: ObjectId[];
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
      isByService: boolean;
      services: ObjectId[];
      clientsTags: string[];
    }
  ];
  clientsTags: string[];
  /**
   * @todo !!!
   * */
  deliveryInfo?: Record<string, string>;
  reservations?: ObjectId[];
  paymentMethods?: Record<string, string>;
  web?: {
    isActive: boolean;
  };
};

export type BusinessDocType = BusinessType & Document;

export type BusinessModelType = PaginatedModel<BusinessDocType>;
