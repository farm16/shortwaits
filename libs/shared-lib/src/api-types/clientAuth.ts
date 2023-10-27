import { ClientUserDtoType } from ".";
import { CommonResponseType } from "./helpers";

export type ClientTokenPayloadType = {
  token: string | null;
  refreshToken: string | null;
};
export type ClientAuthPayloadType = {
  auth: ClientTokenPayloadType;
  attributes?: {
    currentUser: ClientUserDtoType;
  };
};

export type ClientAuthDtoType = {
  auth: ClientTokenPayloadType;
  attributes?: {
    currentUser: ClientUserDtoType;
  };
};

export type ClientAuthResponseType = CommonResponseType<ClientAuthDtoType>;

export type ClientAuthFnType = (payload: ClientAuthPayloadType, message: string) => ClientAuthResponseType;

export type ClientRegisterWithEmailRequestType = {
  email: string;
  password: string;
};
