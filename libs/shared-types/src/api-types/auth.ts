import { CommonResponseType } from "./helpers";

import { BusinessPayloadType, UserPayloadType } from ".";

export type TokenPayloadType = {
  readonly token: string | null;
  readonly refreshToken: string | null;
};
export type AuthPayloadType = {
  readonly auth: TokenPayloadType;
  readonly attributes: {
    readonly currentBusinessAccounts: BusinessPayloadType[];
    readonly currentUser: UserPayloadType;
  };
};

export type AuthResponseType = CommonResponseType<AuthPayloadType>;

export type AuthFnType = (
  payload: AuthPayloadType,
  message: string
) => AuthResponseType;

export type RegisterWithEmailRequestType = {
  readonly email: string;
  readonly password: string;
};
