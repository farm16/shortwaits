import { ShortwaitsAdminDefaultDataType } from "..";

import { DocType, CommonResponseType } from ".";

export type ShortwaitsAdminDefaultDataSuccessResponseType =
  CommonResponseType<ShortwaitsAdminDefaultDataPayloadType>;

export type ShortwaitsAdminDefaultDataPayloadType =
  DocType<ShortwaitsAdminDefaultDataType>;

export type ShortwaitsAdminDefaultDataSuccessFnType = (
  payload: ShortwaitsAdminDefaultDataPayloadType,
  message: string
) => ShortwaitsAdminDefaultDataSuccessResponseType;
