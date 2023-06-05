import { BusinessCategoryType } from "..";

import { DocType, CommonResponseType } from ".";

export type CategoriesPayloadType = DocType<BusinessCategoryType>;

export type CategoriesSuccessResponseType = CommonResponseType<
  CategoriesPayloadType[]
>;

export type CategoriesSuccessFnType = (
  payload: CategoriesPayloadType[],
  message: string
) => CategoriesSuccessResponseType;
