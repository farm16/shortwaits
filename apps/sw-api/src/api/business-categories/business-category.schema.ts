import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BusinessCategoryType, ObjectId } from "@shortwaits/shared-lib";
import { Document } from "mongoose";

@Schema({ collection: "business_category" })
export class BusinessCategory extends Document<ObjectId> implements BusinessCategoryType {
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

export const BusinessCategorySchema = SchemaFactory.createForClass(BusinessCategory);
