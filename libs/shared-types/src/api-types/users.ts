import { BusinessUserType } from "../models-types";

import { CommonResponseType, DocType } from ".";
import { ConvertIdsToStrings } from "../common";

export type UserDocType = DocType<BusinessUserType>;
export type UserResponseType = CommonResponseType<UserDocType>;
export type UserDtoType = ConvertIdsToStrings<UserDocType>;

export type UserSuccessFnType = (
  payload: UserDocType,
  message: string
) => UserResponseType;
