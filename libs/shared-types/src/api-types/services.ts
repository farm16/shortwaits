import { ServicesType } from '..';

import { DocType, SuccessResponseType } from '.';

export type ServicesSuccessResponseType =
  SuccessResponseType<ServicesPayloadType>;

export type ServicesPayloadType = readonly DocType<ServicesType>[];

export type ServicesSuccessFnType = (
  payload: ServicesPayloadType,
  message: string
) => ServicesSuccessResponseType;
