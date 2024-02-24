import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BusinessCategoryType } from "@shortwaits/shared-lib";
import { Document } from "mongoose";

@Schema()
export class Categories extends Document implements BusinessCategoryType {
  @ApiProperty()
  @Prop()
  short_id: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  keys: [];

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  translations: {
    languageCode: string;
    languageName: string;
    translation: string;
  }[];

  @ApiProperty()
  @Prop({ default: false })
  isDefault: boolean;

  @ApiProperty()
  @Prop()
  state: number;

  @ApiProperty()
  @Prop({ default: false })
  deleted?: boolean;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
