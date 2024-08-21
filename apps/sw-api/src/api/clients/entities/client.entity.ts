import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Alias, ClientType, ObjectId, UserDeviceSettings } from "@shortwaits/shared-lib";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({ collection: "client" })
export class Client extends Document<ObjectId> implements ClientType {
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
  deviceSettings: UserDeviceSettings[];

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
  createdAt: string;

  @ApiProperty()
  @Prop()
  updatedAt: string;

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
    registrationType: "external";
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

export const ClientUserSchema = SchemaFactory.createForClass(Client);
