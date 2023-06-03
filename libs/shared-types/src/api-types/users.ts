import { BusinessUserType } from "../models-types";

import { CommonResponseType, DocType } from ".";

export type UserResponseType = CommonResponseType<UserPayloadType>;

export type UserPayloadType = DocType<BusinessUserType>;

export type UserSuccessFnType = (
  payload: UserPayloadType,
  message: string
) => UserResponseType;
