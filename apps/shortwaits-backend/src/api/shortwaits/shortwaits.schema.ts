import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import {
  BusinessHoursType,
  CategoriesPayloadType,
  CurrencyType,
  ServiceColorsType,
  ServicesType,
  ShortwaitsAdminDefaultDataType,
  ObjectId,
} from '@shortwaits/shared-types';

@Schema()
export class Shortwaits
  extends Document
  implements ShortwaitsAdminDefaultDataType
{
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
  @Prop(
    raw({
      categories: { type: Array },
      services: { type: Array },
      currencies: { type: Array },
      hours: { type: Object },
    })
  )
  sampleBusinessData: {
    categories: ObjectId[];
    services: ServicesType[];
    currencies: CurrencyType[];
    hours: BusinessHoursType;
  };
  @ApiProperty()
  @Prop({ type: Object })
  serviceColors: ServiceColorsType;
}

export const ShortwaitsSchema = SchemaFactory.createForClass(Shortwaits);
