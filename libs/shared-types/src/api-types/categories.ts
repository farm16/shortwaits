import { BusinessCategoryType } from "..";

import { DocType, SuccessResponseType } from ".";

export type CategoriesPayloadType = DocType<BusinessCategoryType>;

export type CategoriesSuccessResponseType = SuccessResponseType<
  CategoriesPayloadType[]
>;

export type CategoriesSuccessFnType = (
  payload: CategoriesPayloadType[],
  message: string
) => CategoriesSuccessResponseType;
