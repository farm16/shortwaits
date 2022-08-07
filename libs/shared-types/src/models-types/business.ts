import { Document } from 'mongoose';

import { ObjectId } from '../common';

import {
  BusinessHoursType,
  BusinessLocationType,
  CurrencyType,
  PaginatedModel,
} from './helpers';

export type BusinessType = {
  readonly admins: readonly ObjectId[] /** @todo this might not always be received via the API why should it ? */;
  readonly superAdmins: readonly ObjectId[] /** @todo this might not always be received via the API why should it ? */;
  readonly backgroundAdmins: readonly ObjectId[] /** @todo this might not always be received via the API why should it ? */;
  readonly staff: readonly ObjectId[] /** @todo every UserType in the Shortwaits admin app is a staff */;
  readonly categories: readonly ObjectId[];
  readonly services: readonly ObjectId[];
  readonly description: string;
  readonly currency: CurrencyType;
  readonly country: string;
  readonly phone1: string;
  readonly shortName: string;
  readonly longName: string;
  readonly hours: BusinessHoursType;
  readonly location: BusinessLocationType;
  readonly isRegistrationCompleted: boolean;
  readonly deleted: boolean;
  readonly createdBy: ObjectId;
  readonly updatedBy: ObjectId;
  /**
   * @todo !!!
   * */
  readonly deliveryInfo?: Record<string, string>;
  readonly reservations?: readonly ObjectId[];
  readonly paymentMethods?: Record<string, string>;
};

export type BusinessDocType = BusinessType & Document;

export type BusinessModelType = PaginatedModel<BusinessDocType>;
