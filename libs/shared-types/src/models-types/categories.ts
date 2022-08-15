import { Document } from "mongoose";

import { PaginatedModel } from "./helpers";

export type BusinessCategoryType = {
  readonly short_id: string;
  readonly name: string;
  readonly keys: readonly string[];
  readonly description: string;
  readonly translations: readonly {
    readonly languageCode: string;
    readonly languageName: string;
    readonly translation: string;
  }[];
  readonly isDefault: boolean;
  readonly state: number;
  readonly deleted?: boolean;
};

export type CategoriesDocType = BusinessCategoryType & Document;

export type CategoriesModelType = PaginatedModel<CategoriesDocType>;
