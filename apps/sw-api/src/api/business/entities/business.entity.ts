import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import {
  AccountType,
  BusinessHoursType,
  BusinessLocationType,
  BusinessType,
  CurrencyType,
  ObjectId,
  BusinessLabelsType,
} from "@shortwaits/shared-lib";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Business extends Document implements BusinessType {
  @ApiProperty()
  @Prop(
    raw({
      name: String,
      description: String,
      isFavorite: Boolean,
      emojiShortName: String,
    })
  )
  labels: BusinessLabelsType;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  events: ObjectId[];

  @ApiProperty()
  @Prop()
  admins: ObjectId[];

  @ApiProperty()
  @Prop()
  superAdmins: ObjectId[];

  @ApiProperty()
  @Prop()
  backgroundAdmins: ObjectId[];

  @ApiProperty()
  @Prop({ type: String, enum: AccountType, default: AccountType.FREE })
  accountType: AccountType;

  @ApiProperty()
  @Prop()
  staff: ObjectId[];

  @ApiProperty()
  @Prop()
  categories: ObjectId[];

  @ApiProperty()
  @Prop()
  services: ObjectId[];

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
  createdBy: MongooseSchema.Types.ObjectId;

  @ApiProperty()
  @Prop()
  updatedBy: MongooseSchema.Types.ObjectId;

  @ApiProperty()
  @Prop()
  clients: ObjectId[];

  @ApiProperty()
  @Prop()
  deliveryInfo: MongooseSchema.Types.Mixed;

  @ApiProperty()
  @Prop()
  reservations: ObjectId[];

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
      clientId: ObjectId;
      services: ObjectId[];
      tags: string[];
    }
  ];

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.Date, default: Date.now })
  createdAt: Date;

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.Date, default: Date.now })
  updatedAt: Date;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);

BusinessSchema.pre<Business>("save", function (next) {
  this.updatedAt = new Date();
  next();
});
