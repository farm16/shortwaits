import { ShortwaitsAdminDefaultDataType } from '..';

import { DocType, SuccessResponseType } from '.';

export type ShortwaitsAdminDefaultDataSuccessResponseType = SuccessResponseType<
  readonly ShortwaitsAdminDefaultDataPayloadType[]
>;

export type ShortwaitsAdminDefaultDataPayloadType =
  DocType<ShortwaitsAdminDefaultDataType>;

export type ShortwaitsAdminDefaultDataSuccessFnType = (
  payload: readonly ShortwaitsAdminDefaultDataPayloadType[],
  message: string
) => ShortwaitsAdminDefaultDataSuccessResponseType;
