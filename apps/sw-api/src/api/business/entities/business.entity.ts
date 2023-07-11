import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import {
  AccountType,
  BusinessHoursType,
  BusinessLocationType,
  BusinessType,
  CurrencyType,
  ObjectId,
} from "@shortwaits/shared-types";

@Schema()
export class Business extends Document implements BusinessType {
  @Prop()
  email: string;

  @Prop()
  events: ObjectId[];

  @Prop()
  admins: ObjectId[];

  @Prop()
  superAdmins: ObjectId[];

  @Prop()
  backgroundAdmins: ObjectId[];

  @Prop({ type: String, enum: AccountType, default: AccountType.FREE })
  accountType: AccountType;

  @Prop()
  staff: ObjectId[];

  @Prop()
  categories: ObjectId[];

  @Prop()
  services: ObjectId[];

  @Prop()
  description: string;

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

  @Prop()
  country: string;

  @Prop()
  phone1: string;

  @Prop()
  shortName: string;

  @Prop()
  longName: string;

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

  @Prop({ default: false })
  isRegistrationCompleted: boolean;

  @Prop({ default: false })
  deleted: boolean;

  @Prop()
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop()
  updatedBy: MongooseSchema.Types.ObjectId;

  @Prop()
  clients: ObjectId[];

  @Prop()
  deliveryInfo: MongooseSchema.Types.Mixed;

  @Prop()
  reservations: ObjectId[];

  @Prop()
  paymentMethods: MongooseSchema.Types.Mixed;

  @Prop(
    raw({
      isActive: { type: Boolean, default: false },
    })
  )
  web: { isActive: boolean };

  @Prop()
  taggedClients: [
    {
      clientId: ObjectId;
      services: ObjectId[];
      tags: string[];
    }
  ];
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
