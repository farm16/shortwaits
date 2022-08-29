import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  DocType,
  EventType,
  ServicesType,
  UserPayloadType,
} from "@shortwaits/shared-types";
import mongoose, { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Events extends Document implements EventType {
  @ApiProperty()
  @Prop()
  name: string;
  @ApiProperty()
  @Prop()
  description: string;
  @ApiProperty()
  @Prop({
    type: MongooseSchema.Types.Mixed,
  })
  service: DocType<ServicesType>;
  @ApiProperty()
  @Prop()
  createdBy: mongoose.Types.ObjectId;
  @ApiProperty()
  @Prop()
  updatedBy: mongoose.Types.ObjectId;
  @ApiProperty()
  @Prop()
  staff: UserPayloadType[];
  @ApiProperty()
  @Prop()
  clients: UserPayloadType[];
  @ApiProperty()
  @Prop()
  features: string[];
  @ApiProperty()
  @Prop(raw({ statusCode: Number, statusName: String }))
  status: { statusCode: number; statusName: "pending" | "success" | "failed" };
  @ApiProperty()
  @Prop()
  durationInMin: number;
  @ApiProperty()
  @Prop()
  startTime: Date;
  @ApiProperty()
  @Prop()
  endTime: Date;
  @ApiProperty()
  @Prop()
  endTimeExpected: Date;
  @ApiProperty()
  @Prop()
  priceExpected: number;
  @ApiProperty()
  @Prop()
  priceFinal: number;
  @ApiProperty()
  @Prop({ default: false })
  canceled: boolean;
  @ApiProperty()
  @Prop()
  cancellationReason: string;
  @ApiProperty()
  @Prop({ default: false })
  isGroupEvent: boolean;
  @ApiProperty()
  @Prop({ default: false })
  repeat: boolean;
  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  payment: object;
  @ApiProperty()
  @Prop()
  notes: string;
  @ApiProperty()
  @Prop()
  labels: string[];
  @ApiProperty()
  @Prop({ default: false })
  deleted: boolean;
}
export const EventsSchema = SchemaFactory.createForClass(Events);
