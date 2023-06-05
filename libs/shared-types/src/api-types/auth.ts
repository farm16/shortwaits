import { CommonResponseType } from "./helpers";

import { BusinessDocType, UserDocType } from ".";

export type TokenPayloadType = {
  token: string | null;
  refreshToken: string | null;
};
export type AuthPayloadType = {
  auth: TokenPayloadType;
  attributes: {
    currentBusinessAccounts: BusinessDocType[];
    currentUser: UserDocType;
  };
};

export type AuthResponseType = CommonResponseType<AuthPayloadType>;

export type AuthFnType = (
  payload: AuthPayloadType,
  message: string
) => AuthResponseType;

export type RegisterWithEmailRequestType = {
  email: string;
  password: string;
};
