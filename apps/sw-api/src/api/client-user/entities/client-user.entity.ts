import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Schema as MongooseSchema } from "mongoose";
import { ClientUserType, ObjectId } from "@shortwaits/shared-types";

@Schema({ collection: "client-users" })
export class ClientUser extends Document implements ClientUserType {
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
      address1: { type: String, default: "" },
      address2: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: Number, default: 0 },
      countryCode: { type: String, default: "" },
    })
  )
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
      kind: String,
      uid: String,
      username: String,
      password: String,
    })
  )
  socialAccounts: {
    kind: string;
    uid?: string;
    username?: string;
    password?: string;
  }[];
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
  @Prop()
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
  rolId: MongooseSchema.Types.ObjectId;
  @ApiProperty()
  @Prop()
  hashedRt: string;
  @ApiProperty()
  @Prop()
  clientType: "partial" | "full";
  @ApiProperty()
  @Prop(
    raw({
      state: String,
      stateDescriptions: Array,
      isRegistered: Boolean,
    })
  )
  registration: {
    state: string;
    stateDescriptions: string[];
    isRegistered: boolean;
  };
  @ApiProperty()
  @Prop(
    raw({
      membershipTypeId: MongooseSchema.Types.ObjectId,
      invoiceId: MongooseSchema.Types.ObjectId,
      type: String,
      price: Number,
      code: String,
      status: String,
      description: String,
      isFaulty: Boolean,
      faultyReason: Array,
    })
  )
  currentMembership: {
    membershipTypeId: MongooseSchema.Types.ObjectId;
    invoiceId: MongooseSchema.Types.ObjectId;
    type: string;
    price: number;
    code: string;
    status: string;
    description: string;
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
    invoiceId: MongooseSchema.Types.ObjectId;
  };
}

export const ClientUserSchema = SchemaFactory.createForClass(ClientUser);