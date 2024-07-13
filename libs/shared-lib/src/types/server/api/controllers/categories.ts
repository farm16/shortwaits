import { BusinessCategoryType, CommonResponseType, DocType, DtoFriendlyType } from "../../..";

export type CategoryDtoType = DtoFriendlyType<DocType<BusinessCategoryType>>;
export type CategoriesDtoType = CategoryDtoType[];
export type CategoryResponseType = CommonResponseType<CategoryDtoType>;
export type CategoriesResponseType = CommonResponseType<CategoriesDtoType>;
