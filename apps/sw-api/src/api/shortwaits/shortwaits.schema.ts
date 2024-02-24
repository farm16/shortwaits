import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  AccountPermissions,
  BusinessHoursType,
  CurrencyType,
  ObjectId,
  ServiceColorsType,
  ServiceType,
  ShortwaitsAdminBannersType,
  ShortwaitsAdminDefaultDataType,
} from "@shortwaits/shared-lib";
import { Document } from "mongoose";

@Schema()
export class Shortwaits extends Document implements ShortwaitsAdminDefaultDataType {
  @ApiProperty()
  @Prop(
    raw({
      free: { type: Object },
      premium: { type: Object },
      student: { type: Object },
      basic: { type: Object },
      trial: { type: Object },
      business: { type: Object },
      enterprise: { type: Object },
      partner: { type: Object },
    })
  )
  accountPermissions: AccountPermissions;
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
  defaultBusinessData: {
    services: ServiceType[];
    currencies: CurrencyType[];
    hours: BusinessHoursType;
  };
  @ApiProperty()
  @Prop({ type: Object })
  serviceColors: ServiceColorsType;
}

export const ShortwaitsSchema = SchemaFactory.createForClass(Shortwaits);
