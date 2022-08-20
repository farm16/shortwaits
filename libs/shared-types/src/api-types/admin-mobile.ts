import { ShortwaitsAdminDefaultDataType } from "..";

import { DocType, SuccessResponseType } from ".";

export type ShortwaitsAdminDefaultDataSuccessResponseType =
  SuccessResponseType<ShortwaitsAdminDefaultDataPayloadType>;

export type ShortwaitsAdminDefaultDataPayloadType =
  DocType<ShortwaitsAdminDefaultDataType>;

export type ShortwaitsAdminDefaultDataSuccessFnType = (
  payload: ShortwaitsAdminDefaultDataPayloadType,
  message: string
) => ShortwaitsAdminDefaultDataSuccessResponseType;
