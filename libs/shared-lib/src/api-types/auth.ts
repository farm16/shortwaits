import { CommonResponseType } from "./helpers";

import { BusinessDocType, BusinessDtoType, UserDocType, UserDtoType } from ".";

export type TokenPayloadType = {
  token: string | null;
  refreshToken: string | null;
};
export type AuthPayloadType = {
  auth: TokenPayloadType;
  attributes?: {
    currentBusinessAccounts: BusinessDocType[];
    currentUser: UserDocType;
  };
};

export type AuthDtoType = {
  auth: TokenPayloadType;
  attributes?: {
    currentBusinessAccounts: BusinessDtoType[];
    currentUser: UserDtoType;
  };
};

export type AuthResponseType = CommonResponseType<AuthDtoType>;

export type AuthFnType = (
  payload: AuthPayloadType,
  message: string
) => AuthResponseType;

export type RegisterWithEmailRequestType = {
  email: string;
  password: string;
};
