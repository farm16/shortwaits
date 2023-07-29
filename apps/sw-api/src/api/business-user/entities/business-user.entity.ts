import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";
import { BusinessUserType, ObjectId } from "@shortwaits/shared-lib";

@Schema({ collection: "business-users" })
export class BusinessUser extends Document implements BusinessUserType {
  @ApiProperty()
  @Prop()
  roleId: Types.ObjectId;
  @ApiProperty()
  @Prop()
  displayName: string;
  @ApiProperty()
  @Prop()
  familyName: string;
  @ApiProperty()
  @Prop()
  givenName: string;
  @ApiProperty()
  @Prop()
  middleName: string;
  @ApiProperty()
  @Prop()
  phoneNumbers: {
    label: string;
    number: string;
  }[];
  @ApiProperty()
  @Prop()
  imAddresses: {
    username: string;
    service: string;
  }[];
  @ApiProperty()
  @Prop()
  addresses: {
    label: string;
    address1: string;
    address2: string;
    city: string;
    region: string;
    state: string;
    postCode: number;
    country: string;
  }[];
  @ApiProperty()
  @Prop(
    raw({
      year: { type: Number },
      month: { type: Number },
      day: { type: Number },
    })
  )
  birthday: {
    year: number;
    month: number;
    day: number;
  };
  @ApiProperty()
  @Prop()
  businesses: Types.ObjectId[];
  @ApiProperty()
  @Prop()
  alias: "familyName" | "givenName" | "middleName" | "displayName";
  @ApiProperty()
  @Prop()
  customAlias: string;
  @ApiProperty()
  @Prop({ unique: true, trim: true, required: true })
  username: string;
  @ApiProperty()
  @Prop()
  firstName: string;
  @ApiProperty()
  @Prop()
  lastName: string;
  @ApiProperty()
  @Prop()
  accountImageUrl: string;
  @ApiProperty()
  @Prop(
    raw({
      address1: { type: String, default: "" },
      address2: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: Number, default: 0 },
      countryCode: { type: String, default: "" },
    })
  )
  address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    countryCode: string;
  };
  @ApiProperty()
  @Prop()
  socialAccounts: [];
  @ApiProperty()
  @Prop(
    raw({
      screenName: { type: String, default: "" },
      state: { type: Number, trim: true, default: 0 },
      isCompleted: { type: Boolean, default: false },
    })
  )
  registrationState: {
    screenName: string;
    state: number;
    isCompleted: boolean;
  };
  @ApiProperty()
  @Prop({ unique: true, trim: true, required: true })
  email: string;

  @ApiProperty()
  @Prop()
  password?: string;
  @ApiProperty()
  @Prop()
  desiredCurrencies: string[];
  @ApiProperty()
  @Prop(
    raw({
      countryCode: { type: String, default: "" },
      isRTL: { type: Boolean, default: true },
      languageCode: { type: String, default: "" },
      languageTag: { type: String, default: "" },
    })
  )
  locale: {
    countryCode: string;
    isRTL: boolean;
    languageCode: string;
    languageTag: string;
  };
  @ApiProperty()
  @Prop({ default: false })
  deleted: boolean;
  @ApiProperty()
  @Prop()
  createdAt: string;
  @ApiProperty()
  @Prop()
  updatedAt: string;
  @ApiProperty()
  @Prop()
  lastSignInAt: Date;
  @ApiProperty()
  @Prop({ default: null })
  hashedRt: string;
}

export const BusinessUserSchema = SchemaFactory.createForClass(BusinessUser);
