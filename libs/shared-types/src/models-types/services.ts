import { Document } from 'mongoose';

import { ObjectId } from '../common';

import {
  BusinessAvailableCurrenciesType,
  BusinessHoursType,
  PaginatedModel,
  ServiceColorType,
} from './helpers';

export type ServicesType = {
  readonly businessId: ObjectId;
  readonly name: string;
  readonly description: string;
  readonly hours: BusinessHoursType;
  readonly applicableCategories: readonly ObjectId[];
  readonly durationInMin: number;
  readonly price: number;
  readonly currency: BusinessAvailableCurrenciesType;
  readonly isPrivate: boolean;
  readonly urls?: {
    readonly zoom?: string;
    readonly other1?: string;
    readonly other2?: string;
  };
  readonly isVideoConference: boolean;
  readonly deleted: boolean;
  readonly serviceColor: ServiceColorType;
  readonly imageUrl: string;
  readonly createdBy: ObjectId;
  readonly updatedBy: ObjectId;
};

export type ServicesDocType = ServicesType & Document;

export type ServicesModelType = PaginatedModel<ServicesDocType>;
