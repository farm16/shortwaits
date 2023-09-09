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
  @Prop()
  shortId: string;

  @ApiProperty()
  @Prop()
  isDisabled: boolean;

  @ApiProperty()
  @Prop()
  isWebBookingEnabled: boolean;

  @ApiProperty()
  @Prop()
  isSmsNotificationEnabled: boolean;

  @ApiProperty()
  @Prop()
  isAppNotificationEnabled: boolean;

  @ApiProperty()
  @Prop()
  videoConference: { isActive: boolean; url: string }[];

  @ApiProperty()
  @Prop()
  isVideoConferenceEnabled: boolean;

  @ApiProperty()
  @Prop()
  supportEmail?: string;

  @ApiProperty()
  @Prop()
  supportPhone?: string;

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
  deliveryInfo: string;

  @ApiProperty()
  @Prop()
  reservations: ObjectId[];

  @ApiProperty()
  @Prop()
  paymentMethods: string[];

  @ApiProperty()
  @Prop(
    raw({
      isActive: { type: Boolean, default: false },
      baseUrl: String,
      bannerImageUrl: String,
      logoImageUrl: String,
      faviconImageUrl: String,
      primaryColor: String,
      secondaryColor: String,
      accentColor: String,
      notificationMessage: String,
    })
  )
  web: {
    isActive: boolean;
    baseUrl: string;
    bannerImageUrl: string;
    logoImageUrl: string;
    faviconImageUrl: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    notificationMessage: string;
  };

  @ApiProperty()
  @Prop(
    raw({
      allowBooking: { type: Boolean, default: true },
      allowRescheduling: { type: Boolean, default: true },
      allowCancellation: { type: Boolean, default: true },
      allowPayment: { type: Boolean, default: true },
      allowCheckIn: { type: Boolean, default: true },
      allowCheckOut: { type: Boolean, default: true },
      allowNoShow: { type: Boolean, default: true },
      allowWaitlist: { type: Boolean, default: true },
    })
  )
  booking: {
    allowBooking: boolean;
    allowRescheduling: boolean;
    allowCancellation: boolean;
    allowPayment: boolean;
    allowCheckIn: boolean;
    allowCheckOut: boolean;
    allowNoShow: boolean;
    allowWaitlist: boolean;
  };

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
