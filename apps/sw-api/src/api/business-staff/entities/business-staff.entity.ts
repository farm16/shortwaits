import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BusinessUserType, WeekHoursType } from "@shortwaits/shared-lib";
import { Document, Types } from "mongoose";

@Schema({ collection: "business-users" })
export class BusinessUser extends Document implements BusinessUserType {
  @ApiProperty()
  @Prop()
  roleId: Types.ObjectId;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  isPasswordProtected: boolean;

  @ApiProperty()
  @Prop()
  businesses: Types.ObjectId[];

  @ApiProperty()
  @Prop()
  isDisabled: boolean;

  @ApiProperty()
  @Prop()
  isStaff: boolean;

  @ApiProperty()
  @Prop()
  createdByBusinessId: Types.ObjectId;

  @ApiProperty()
  @Prop({ default: false })
  deleted: boolean;

  @ApiProperty()
  @Prop()
  preferredAlias: "username" | "displayName";

  @ApiProperty()
  @Prop({
    unique: true,
  })
  username: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  isEmailVerified: boolean;

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
  hours: WeekHoursType;

  @ApiProperty()
  @Prop()
  displayName: string;

  @ApiProperty()
  @Prop()
  familyName: string;
  givenName: string;
  middleName: string;
  accountImageUrl: string;
  primaryPhoneNumberLabel: string;
  phoneNumbers: { label: string; number: string }[];
  imAddresses: { username: string; service: string }[];
  @ApiProperty()
  @Prop()
  addresses: {
    label: string;
    address1: string;
    address2: string;
    city: string;
    region: string;
    state: string;
    postCode: string;
    country: string;
  }[];
  socialAccounts: { kind: string; uid?: string; username?: string }[];

  @ApiProperty()
  @Prop()
  birthday: string;

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
  locale: { countryCode: string; isRTL: boolean; languageCode: string; languageTag: string };

  @Prop(
    raw({
      screenName: { type: String, default: "" },
      state: { type: Number, trim: true, default: 0 },
      isCompleted: { type: Boolean, default: false },
    })
  )
  registrationState: { screenName: string; state: number; isCompleted: boolean };

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