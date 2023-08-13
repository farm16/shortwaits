import { Document } from "mongoose";

import { ObjectId } from "../common-types";

import {
  BusinessAvailableCurrenciesType,
  BusinessHoursType,
  PaginatedModel,
  ServiceColorType,
} from "./helpers";

export type ServicesType = {
  businessId: ObjectId;
  name: string;
  description: string;
  hours: BusinessHoursType;
  applicableCategories: ObjectId[];
  staff: ObjectId[];
  durationInMin: number;
  price: number;
  currency: BusinessAvailableCurrenciesType;
  isPrivate: boolean;
  urls?: {
    zoom?: string;
    other1?: string;
    other2?: string;
  };
  isVideoConference: boolean;
  deleted: boolean;
  serviceColor: ServiceColorType;
  imageUrl: string;
  createdBy: ObjectId;
  updatedBy: ObjectId;
};

type ServicesDocType = ServicesType & Document;

export type ServicesModelType = PaginatedModel<ServicesDocType>;