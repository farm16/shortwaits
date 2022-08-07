import { BusinessType } from '..';

import { DocType, SuccessResponseType } from '.';

export type BusinessSuccessResponseType =
  SuccessResponseType<BusinessPayloadType>;

export type BusinessPayloadType = DocType<BusinessType>;

export type BusinessSuccessFnType = (
  payload: BusinessPayloadType,
  message: string
) => BusinessSuccessResponseType;
