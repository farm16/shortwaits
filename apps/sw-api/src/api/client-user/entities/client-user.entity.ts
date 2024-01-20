import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { ClientUserType, ObjectId } from "@shortwaits/shared-utils";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({ collection: "client-users" })
export class ClientUser extends Document implements ClientUserType {
  @ApiProperty()
  @Prop()
  isSocialAccount: boolean;

  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  socialAccount: {
    kind: string;
    uid?: string;
    username?: string;
  };

  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  deviceSetting: {
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isTwoFactorEnabled: boolean;
    isTwoFactorVerified: boolean;
    isTouchIdEnabled: boolean;
    isTouchIdVerified: boolean;
    isFaceIdEnabled: boolean;
    isFaceIdVerified: boolean;
    isPasswordlessEnabled: boolean;
  };

  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  accountSettings: {
    isDarkModeEnabled: boolean;
    isNotificationsEnabled: boolean;
    isLocationEnabled: boolean;
    isLocationShared: boolean;
    isLocationSharedWithBusinesses: boolean;
  };

  @ApiProperty()
  @Prop()
  shortId: string;

  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.ObjectId,
    })
  )
  roleId: ObjectId;

  @ApiProperty()
  @Prop()
  businesses: ObjectId[];

  @ApiProperty()
  @Prop()
  doe: Date;

  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop({
    default: "displayName",
  })
  alias: "displayName" | "familyName" | "givenName" | "middleName" | "username";

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
  accountImageUrl: string;

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
  @Prop(
    raw({
      type: Array,
    })
  )
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

  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  registrationState: {
    screenName: string;
    state: number;
    isCompleted: boolean;
  };

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  desiredCurrencies: string[];
  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  locale: {
    countryCode: string;
    isRTL: boolean;
    languageCode: string;
    languageTag: string;
  };

  @ApiProperty()
  @Prop()
  deleted: boolean;

  @ApiProperty()
  @Prop()
  createdAt: Date;

  @ApiProperty()
  @Prop()
  updatedAt: Date;

  @ApiProperty()
  @Prop()
  lastSignInAt: Date;

  @ApiProperty()
  @Prop()
  hashedRt: string;

  @ApiProperty()
  @Prop()
  clientType: "external";

  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  registration: {
    isRegistered: boolean;
    state: {
      screenName: string;
      state: 0 | 1 | 2 | 3 | 4;
      messages: string[];
      isPendingVerification: boolean;
    };
  };
  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  currentMembership: {
    membershipId: MongooseSchema.Types.ObjectId;
    invoiceId: MongooseSchema.Types.ObjectId;
    membershipShortId: string;
    membershipShortName: string;
    status: string;
    isFaulty: boolean;
    faultyReason: string[];
  };
  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  billing: {
    invoiceId: MongooseSchema.Types.ObjectId;
  };
}

export const ClientUserSchema = SchemaFactory.createForClass(ClientUser);
