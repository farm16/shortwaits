import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";
import { UserType, ObjectId } from "@shortwaits/shared-types";

@Schema()
export class User extends Document implements UserType {
  @ApiProperty()
  @Prop({ default: [] })
  businesses: readonly ObjectId[];

  @ApiProperty()
  address: {
    readonly address1: string;
    readonly address2: string;
    readonly city: string;
    readonly state: string;
    readonly zip: number;
    readonly countryCode: string;
  };

  @ApiProperty()
  accounts: readonly {
    readonly kind: string;
    readonly uid?: string;
    readonly username?: string;
    readonly password?: string;
  }[];

  @ApiProperty()
  locale: {
    readonly countryCode: string;
    readonly isRTL: boolean;
    readonly languageCode: string;
    readonly languageTag: string;
  };

  @ApiProperty()
  @Prop({ trim: true })
  username: string;

  @ApiProperty()
  @Prop({ trim: true })
  firstName: string;

  @ApiProperty()
  @Prop({ trim: true })
  lastName: string;

  @ApiProperty()
  @Prop({ unique: true, trim: true, required: true })
  email: string;

  @ApiProperty()
  @Prop()
  lastSignInAt: Date;

  @ApiProperty()
  @Prop()
  createdAt: string;

  @ApiProperty()
  @Prop()
  updatedAt: string;

  @ApiProperty()
  @Prop(
    raw({
      screenName: { type: String, default: "" },
      state: { type: Number, trim: true, default: 0 },
      isCompleted: { type: Boolean, default: false },
    })
  )
  registrationState: UserType["registrationState"];

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop()
  desiredCurrencies: [string];

  @ApiProperty()
  @Prop()
  locales: [
    {
      countryCode: string;
      isRTL: boolean;
      languageCode: string;
      languageTag: string;
    }
  ];

  @ApiProperty()
  @Prop()
  rolId: Types.ObjectId;

  @ApiProperty()
  @Prop({ default: false })
  deleted: boolean;

  @ApiProperty()
  @Prop({ default: null })
  hashedRt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
