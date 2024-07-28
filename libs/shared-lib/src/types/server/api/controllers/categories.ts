import { BusinessCategoryType, CommonResponseType, DtoFriendlyType, WithDbProps } from "../../..";

export type CategoryDtoType = DtoFriendlyType<WithDbProps<BusinessCategoryType>>;
export type CategoriesDtoType = CategoryDtoType[];
export type CategoryResponseType = CommonResponseType<CategoryDtoType>;
export type CategoriesResponseType = CommonResponseType<CategoriesDtoType>;
