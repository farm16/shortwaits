import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
import {
  BusinessHoursType,
  CurrencyType,
  ServiceColorsType,
  ServicesType,
  ShortwaitsAdminDefaultDataType,
  ObjectId,
  ShortwaitsAdminBannersType,
} from "@shortwaits/shared-lib";

@Schema()
export class Shortwaits extends Document implements ShortwaitsAdminDefaultDataType {
  @ApiProperty()
  @Prop()
  subscriptionPlans: [];
  @ApiProperty()
  @Prop()
  banners: ShortwaitsAdminBannersType[];
  @ApiProperty()
  @Prop()
  readonly short_id: string;
  @ApiProperty()
  @Prop()
  readonly name: string;
  @ApiProperty()
  @Prop()
  readonly description: string;
  @ApiProperty()
  @Prop()
  readonly links: string[];
  @ApiProperty()
  @Prop()
  readonly suggestedLang: string;
  @ApiProperty()
  @Prop()
  readonly blackList: [];
  @ApiProperty()
  @Prop()
  readonly timeZones: [];
  @ApiProperty()
  @Prop()
  readonly categories: ObjectId[];
  @ApiProperty()
  @Prop(
    raw({
      services: { type: Array },
      currencies: { type: Array },
      hours: { type: Object },
    })
  )
  sampleBusinessData: {
    services: ServicesType[];
    currencies: CurrencyType[];
    hours: BusinessHoursType;
  };
  @ApiProperty()
  @Prop({ type: Object })
  serviceColors: ServiceColorsType;
}

export const ShortwaitsSchema = SchemaFactory.createForClass(Shortwaits);
