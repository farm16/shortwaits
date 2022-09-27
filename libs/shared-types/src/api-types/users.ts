import { BusinessUserType } from "../models-types";

import { DocType, SuccessResponseType } from ".";

export type UserSuccessResponseType = SuccessResponseType<UserPayloadType>;

export type UserPayloadType = DocType<BusinessUserType>;

export type UserSuccessFnType = (
  payload: UserPayloadType,
  message: string
) => UserSuccessResponseType;
