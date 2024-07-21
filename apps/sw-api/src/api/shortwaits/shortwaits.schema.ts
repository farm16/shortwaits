import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  AccountPermissions,
  BusinessHoursType,
  BusinessLabelType,
  BusinessMembership,
  BusinessVideoConferencesType,
  CurrencyType,
  ObjectId,
  ServiceColorsType,
  ServiceType,
  ShortwaitsAdminBannersType,
  ShortwaitsStore,
} from "@shortwaits/shared-lib";
import { Document } from "mongoose";

@Schema()
export class Shortwaits extends Document implements ShortwaitsStore {
  @ApiProperty()
  @Prop()
  membershipPlans: BusinessMembership[];

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
    services: Partial<ServiceType>[];
    currencies: CurrencyType[];
    hours: BusinessHoursType;
    labels: BusinessLabelType[];
    videoConferences: BusinessVideoConferencesType;
  };

  @ApiProperty()
  @Prop({ type: Object })
  serviceColors: ServiceColorsType;
}

export const ShortwaitsSchema = SchemaFactory.createForClass(Shortwaits);
