import { Document } from "mongoose";
import { ObjectId } from "../common";
import { BusinessAvailableCurrenciesType, BusinessHoursType, PaginatedModel, ServiceColorType } from "./helpers";

export type ServiceType = {
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
  serviceColor: ServiceColorType;
  imageUrl: string;
  businessId: ObjectId;
  deleted: boolean;
  createdBy: ObjectId;
  updatedBy: ObjectId;
};

export type ServiceDocType = ServiceType & Document;
export type ServicesDocType = ServiceDocType[];

export type ServicesModelType = PaginatedModel<ServiceDocType>;
