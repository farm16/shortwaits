import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BusinessAvailableCurrenciesType, BusinessHoursType, ObjectId, ServiceColorType, ServiceType } from "@shortwaits/shared-lib";
import { Document, Types } from "mongoose";

@Schema({ collection: "business_service" })
export class Service extends Document implements ServiceType {
  @ApiProperty()
  @Prop({ type: Array })
  staff: ObjectId[];

  @Prop({
    type: Types.ObjectId,
  })
  businessId: ObjectId;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  description: string;

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
  @Prop({ type: Array })
  applicableCategories: ObjectId[];

  @ApiProperty()
  @Prop()
  durationInMin: number;

  @ApiProperty()
  @Prop()
  price: number;

  @Prop({ type: String })
  currency: BusinessAvailableCurrenciesType;

  @ApiProperty()
  @Prop()
  isPrivate: boolean;

  @Prop(
    raw({
      zoom: { type: String },
      other1: { type: String },
      other2: { type: String },
    })
  )
  urls: {
    zoom?: string;
    other1?: string;
    other2?: string;
  };

  @ApiProperty()
  @Prop()
  isVideoConference: boolean;

  @ApiProperty()
  @Prop()
  deleted: boolean;

  @Prop(
    raw({
      colorId: { type: String },
      colorName: { type: String },
      hexCode: { type: String },
      isSelected: { type: Boolean },
      isDefault: { type: Boolean },
    })
  )
  serviceColor: ServiceColorType;

  @ApiProperty()
  @Prop()
  imageUrl: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId })
  createdBy: ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId })
  updatedBy: ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
