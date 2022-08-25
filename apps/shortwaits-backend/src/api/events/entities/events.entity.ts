import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { EventType, ObjectId } from "@shortwaits/shared-types";
import { Document, Types } from "mongoose";

@Schema()
export class Events extends Document implements EventType {
  features: string[];
  name: string;
  keys: string[];
  description: string;
  staffIds: ObjectId[];
  clientIds: ObjectId[];
  state: number;
  startTime: Date;
  endTime: Date;
  endTimeExpected: Date;
  priceExpected: number;
  priceFinal: number;
  canceled: boolean;
  cancellationsReason: string;
  deleted: boolean;
}
export const EventsSchema = SchemaFactory.createForClass(Events);
