import { BusinessDtoType, BusinessUserDtoType } from ".";
import { CommonResponseType } from "./helpers";

export type TokenPayloadType = {
  token: string | null;
  refreshToken: string | null;
};
export type AuthPayloadType = {
  auth: TokenPayloadType;
  attributes?: {
    currentBusinessAccounts: BusinessDtoType[];
    currentUser: BusinessUserDtoType;
  };
};

export type AuthDtoType = {
  auth: TokenPayloadType;
  attributes?: {
    currentBusinessAccounts: BusinessDtoType[];
    currentUser: BusinessUserDtoType;
  };
};

export type AuthResponseType = CommonResponseType<AuthDtoType>;

export type AuthFnType = (payload: AuthPayloadType, message: string) => AuthResponseType;

export type RegisterWithEmailRequestType = {
  email: string;
  password: string;
};
