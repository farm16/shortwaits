import { CategoriesType } from '..';

import { DocType, SuccessResponseType } from '.';

export type CategoriesSuccessResponseType = SuccessResponseType<
  readonly CategoriesPayloadType[]
>;

export type CategoriesPayloadType = DocType<CategoriesType>;

export type CategoriesSuccessFnType = (
  payload: readonly CategoriesPayloadType[],
  message: string
) => CategoriesSuccessResponseType;
