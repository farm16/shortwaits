import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Schema as MongooseSchema } from "mongoose";
import { ClientUserType, ObjectId } from "@shortwaits/shared-lib";

@Schema({ collection: "client-users" })
export class ClientUser extends Document implements ClientUserType {
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
    postCode: number;
    country: string;
  }[];
  @ApiProperty()
  @Prop(
    raw({
      type: Array,
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
  password?: string;
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
  clientType: "partial" | "full";
  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  registration: {
    stateDescriptions: string[];
    isRegistered: boolean;
    state: {
      screenName: string;
      state: number;
      isCompleted: boolean;
    };
  };
  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
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
      type: MongooseSchema.Types.Mixed,
    })
  )
  billing: {
    invoiceId: MongooseSchema.Types.ObjectId;
  };
}

export const ClientUserSchema = SchemaFactory.createForClass(ClientUser);
