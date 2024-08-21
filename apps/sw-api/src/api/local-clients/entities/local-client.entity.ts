import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Alias, ClientRegistration, LocalClientType, ObjectId } from "@shortwaits/shared-lib";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({ collection: "local_client" })
export class LocalClient extends Document<ObjectId> implements LocalClientType {
  @ApiProperty()
  @Prop()
  shortId: string;

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
  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: [
      {
        deviceUuid: "",
        hasExportedContacts: false,
        isEmailVerified: false,
        isPhoneVerified: false,
        isTwoFactorEnabled: false,
        isTwoFactorVerified: false,
        isTouchIdEnabled: false,
        isTouchIdVerified: false,
        isFaceIdEnabled: false,
        isFaceIdVerified: false,
        isPasswordlessEnabled: false,
      },
    ],
  })
  deviceSettings: {
    deviceUuid: string;
    hasExportedContacts: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isTwoFactorEnabled: boolean;
    isTwoFactorVerified: boolean;
    isTouchIdEnabled: boolean;
    isTouchIdVerified: boolean;
    isFaceIdEnabled: boolean;
    isFaceIdVerified: boolean;
    isPasswordlessEnabled: boolean;
  }[];

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
    type: String,
    default: "displayName",
  })
  alias: Alias;

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
      screenName: String,
      state: Number,
      isCompleted: Boolean,
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
      countryCode: String,
      isRTL: Boolean,
      languageCode: String,
      languageTag: String,
    })
  )
  locale: {
    countryCode: string;
    isRTL: boolean;
    languageCode: string;
    languageTag: string;
  };

  @ApiProperty()
  @Prop({
    default: false,
  })
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
  @Prop({
    default: "local",
  })
  clientType: "local";

  @ApiProperty()
  @Prop(
    raw({
      isRegistered: Boolean,
      registrationType: String,
      state: {
        screenName: String,
        state: Number,
        messages: Array<string>,
        isPendingVerification: Boolean,
      },
    })
  )
  registration: ClientRegistration;

  @ApiProperty()
  @Prop(
    raw({
      membershipId: MongooseSchema.Types.ObjectId,
      invoiceId: MongooseSchema.Types.ObjectId,
      membershipShortId: String,
      membershipShortName: String,
      status: String,
      isFaulty: Boolean,
      faultyReason: Array,
    })
  )
  currentMembership: {
    membershipId: ObjectId;
    invoiceId: ObjectId;
    membershipShortId: string;
    membershipShortName: string;
    status: string;
    isFaulty: boolean;
    faultyReason: string[];
  };
  @ApiProperty()
  @Prop(
    raw({
      invoiceId: MongooseSchema.Types.ObjectId,
    })
  )
  billing: {
    invoiceId: ObjectId;
  };
}

export const LocalClientUserSchema = SchemaFactory.createForClass(LocalClient);
