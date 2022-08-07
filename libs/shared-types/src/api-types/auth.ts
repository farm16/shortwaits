import { SuccessResponseType } from './helpers';

import { UserPayloadType } from '.';

export type TokenPayloadType = {
  readonly token: string | null;
  readonly refreshToken: string | null;
};
export type AuthPayloadType = {
  readonly auth: TokenPayloadType;
  readonly data: UserPayloadType;
};

export type AuthSuccessResponseType = SuccessResponseType<AuthPayloadType>;

export type AuthSuccessFnType = (
  payload: AuthPayloadType,
  message: string
) => AuthSuccessResponseType;

export type RegisterWithEmailRequestType = {
  readonly email: string;
  readonly password: string;
};
