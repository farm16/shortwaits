import { CommonResponseType, DocType } from ".";
import { BusinessCategoryType, ConvertToDtoType } from "..";

export type CategoryDtoType = ConvertToDtoType<DocType<BusinessCategoryType>>;
export type CategoriesDtoType = CategoryDtoType[];
export type CategoryResponseType = CommonResponseType<CategoryDtoType>;
export type CategoriesResponseType = CommonResponseType<CategoriesDtoType>;
