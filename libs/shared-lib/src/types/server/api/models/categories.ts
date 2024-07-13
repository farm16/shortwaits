import { Document } from "mongoose";
import { PaginatedModel } from "../../../";

export type BusinessCategoryType = {
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

export type CategoriesDocType = BusinessCategoryType & Document;

export type CategoriesModelType = PaginatedModel<CategoriesDocType>;
