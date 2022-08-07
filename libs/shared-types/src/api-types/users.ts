import { UserType } from '../models-types';

import { DocType, SuccessResponseType } from '.';

export type UserSuccessResponseType = SuccessResponseType<UserPayloadType>;

export type UserPayloadType = DocType<UserType>;

export type UserSuccessFnType = (
  payload: UserPayloadType,
  message: string
) => UserSuccessResponseType;
