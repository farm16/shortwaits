import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types, Schema as MongooseSchema } from "mongoose";
import {
  BusinessHoursType,
  BusinessLocationType,
  BusinessType,
  CurrencyType,
  ObjectId,
} from "@shortwaits/shared-types";

@Schema()
export class Business extends Document implements BusinessType {
  @ApiProperty()
  @Prop()
  events: ObjectId[];
  @ApiProperty()
  @Prop()
  admins: Types.ObjectId[];
  @ApiProperty()
  @Prop()
  superAdmins: Types.ObjectId[];
  @ApiProperty()
  @Prop()
  backgroundAdmins: Types.ObjectId[];
  @ApiProperty()
  @Prop()
  staff: Types.ObjectId[];
  @ApiProperty()
  @Prop()
  categories: Types.ObjectId[];
  @ApiProperty()
  @Prop()
  services: Types.ObjectId[];
  @ApiProperty()
  @Prop()
  description: string;
  @ApiProperty()
  @Prop(
    raw({
      name: String,
      code: String,
      symbol: String,
      codeNumber: Number,
      decimalSeparator: Number,
    })
  )
  currency: CurrencyType;
  @ApiProperty()
  @Prop()
  country: string;
  @ApiProperty()
  @Prop()
  phone1: string;
  @ApiProperty()
  @Prop()
  shortName: string;
  @ApiProperty()
  @Prop()
  longName: string;
  @ApiProperty()
  @Prop(
    raw({
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    })
  )
  hours: BusinessHoursType;
  @ApiProperty()
  @Prop(
    raw({
      formattedAddress: String,
      streetAddress: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      coordinates: [Number, Number],
    })
  )
  location: BusinessLocationType;
  @ApiProperty()
  @Prop({ default: false })
  isRegistrationCompleted: boolean;
  @ApiProperty()
  @Prop({ default: false })
  deleted: boolean;
  @ApiProperty()
  @Prop()
  createdBy: Types.ObjectId;
  @ApiProperty()
  @Prop()
  updatedBy: Types.ObjectId;
  @ApiProperty()
  @Prop()
  clients: Types.ObjectId[];
  @ApiProperty()
  @Prop()
  deliveryInfo: MongooseSchema.Types.Mixed;
  @ApiProperty()
  @Prop()
  reservations: Types.ObjectId[];
  @ApiProperty()
  @Prop()
  paymentMethods: MongooseSchema.Types.Mixed;
  @ApiProperty()
  @Prop(
    raw({
      isActive: { type: Boolean, default: false },
    })
  )
  web: { isActive: boolean };
  @ApiProperty()
  @Prop()
  taggedClients: [
    {
      clientId: Types.ObjectId;
      services: Types.ObjectId[];
      tags: string[];
    }
  ];
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
