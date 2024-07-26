import { Document } from "mongoose";
import { ObjectId, PaginatedModel } from "../../../";

export type BusinessCategoryType = {
  _id?: ObjectId;
  short_id: string;
  name: string;
  keys: string[];
  description: string;
  translations: {
    languageCode: string;
    languageName: string;
    translation: string;
  }[];
  isDefault: boolean;
  state: number;
  deleted?: boolean;
};

export type BusinessCategoriesType = BusinessCategoryType[];

export type CategoriesDocType = Document<BusinessCategoryType>;

export type CategoriesModelType = PaginatedModel<CategoriesDocType>;
