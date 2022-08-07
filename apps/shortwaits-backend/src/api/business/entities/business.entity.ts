import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import {
  BusinessHoursType,
  BusinessLocationType,
  BusinessType,
  CurrencyType,
  ObjectId,
} from '@shortwaits/shared-types';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Business extends Document implements BusinessType {
  @ApiProperty()
  @Prop()
  admins: ObjectId[] /** @todo this might not always be received via the API why should it ? */;
  @ApiProperty()
  @Prop()
  superAdmins: ObjectId[] /** @todo this might not always be received via the API why should it ? */;
  @ApiProperty()
  @Prop()
  backgroundAdmins: ObjectId[] /** @todo this might not always be received via the API why should it ? */;
  @ApiProperty()
  @Prop()
  staff: ObjectId[] /** @todo every UsersType in the Shortwaits admin app is a staff */;
  @ApiProperty()
  @Prop()
  categories: [];
  @ApiProperty()
  @Prop()
  services: [];
  @ApiProperty()
  @Prop({ trim: true })
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
  @Prop({ trim: true })
  country: string;
  @ApiProperty()
  @Prop({ trim: true })
  phone1: string;
  @ApiProperty()
  @Prop({ trim: true })
  shortName: string;
  @ApiProperty()
  @Prop({ trim: true })
  longName: string;
  @ApiProperty()
  @Prop(
    raw({
      mon: { type: Array },
      tue: { type: Array },
      wed: { type: Array },
      thu: { type: Array },
      fri: { type: Array },
      sat: { type: Array },
      sun: { type: Array },
    })
  )
  hours: BusinessHoursType;
  @ApiProperty()
  @Prop(
    raw({
      formattedAddress: { type: String },
      streetAddress: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
      coordinates: { type: [Number, Number] },
    })
  )
  location: BusinessLocationType;
  @ApiProperty()
  @Prop()
  isRegistrationCompleted: boolean;
  @ApiProperty()
  @Prop()
  deleted: boolean;
  @ApiProperty()
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  createdBy: User['_id'];
  @ApiProperty()
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  updatedBy: User['_id'];
  /**
   * @todo !!!
   * */
  @ApiProperty()
  @Prop({ type: Object })
  deliveryInfo: Record<string, string>;
  @ApiProperty()
  @Prop()
  events: [];
  @ApiProperty()
  @Prop({ type: Object })
  paymentMethods: Record<string, string>;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
