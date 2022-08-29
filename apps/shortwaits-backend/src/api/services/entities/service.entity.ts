import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import {
  BusinessAvailableCurrenciesType,
  BusinessHoursType,
  ServiceColorType,
  ServicesType,
} from "@shortwaits/shared-types";

@Schema()
export class Service extends Document implements ServicesType {
  @Prop({ required: true })
  businessId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop(
    raw({
      mon: { type: Array },
      tue: { type: Array },
      wed: { type: Array },
      thu: { type: Array },
      fri: { type: Array },
      sat: { type: Array },
      sun: { type: Array },
    })
  )
  hours: BusinessHoursType;

  @Prop()
  applicableCategories: [];

  @Prop()
  durationInMin: number;

  @Prop()
  price: number;

  @Prop({ type: String })
  currency: BusinessAvailableCurrenciesType;

  @Prop()
  isPrivate: boolean;

  @Prop(
    raw({
      zoom: { type: String },
      other1: { type: String },
      other2: { type: String },
    })
  )
  urls: Record<string, string>;

  @Prop()
  isVideoConference: boolean;

  @Prop()
  deleted: boolean;

  @Prop(
    raw({
      colorId: { type: String },
      colorName: { type: String },
      hexCode: { type: String },
      isSelected: { type: Boolean },
      isDefault: { type: Boolean },
    })
  )
  serviceColor: ServiceColorType;

  @Prop()
  imageUrl: string;

  @Prop()
  createdBy: Types.ObjectId;

  @Prop()
  updatedBy: Types.ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
