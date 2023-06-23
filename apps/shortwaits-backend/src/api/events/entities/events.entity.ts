import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  EventLocationType,
  EventType,
  EventUrlsType,
  ObjectId,
} from "@shortwaits/shared-types";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

class EventUrls implements EventUrlsType {
  type: string;
  isSupported: boolean;
  name: string;
  url: string;
}

class EventLocation implements EventLocationType {
  address: string; // Full address of the location
  latitude: number; // Latitude of the location
  longitude: number; // Longitude of the location
}
@Schema()
export class Events extends Document implements EventType {
  @ApiProperty()
  @Prop()
  expectedEndTime: Date;

  @ApiProperty()
  @Prop()
  registrationDeadlineTime: Date;

  @ApiProperty()
  @Prop()
  paymentMethod:
    | "CREDIT CARD"
    | "DEBIT CARD"
    | "BANK TRANSFER"
    | "PAYPAL"
    | "APPLE PAY"
    | "GOOGLE PAY"
    | "BITCOIN"
    | "AMAZON PAY"
    | "CASH"
    | "ZELLE"
    | "CASH APP";

  @ApiProperty()
  @Prop({ type: Array })
  participantsIds: ObjectId[];

  @ApiProperty()
  @Prop({ type: Types.ObjectId })
  leadClientId: ObjectId;

  @ApiProperty()
  @Prop()
  urls: EventUrls[];

  @ApiProperty()
  @Prop()
  location: EventLocation | null;

  @ApiProperty()
  @Prop()
  attendeeLimit: number;

  @ApiProperty()
  @Prop()
  registrationFee: number;

  @ApiProperty()
  @Prop({ type: Types.ObjectId })
  serviceId: ObjectId;

  @ApiProperty()
  @Prop()
  staffIds: ObjectId[];

  @ApiProperty()
  @Prop()
  clientsIds: ObjectId[];

  @ApiProperty()
  @Prop()
  hasNoDuration: boolean;

  @ApiProperty()
  @Prop()
  leadClientName: string;

  @ApiProperty()
  @Prop()
  eventImage: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId })
  businessId: ObjectId;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId })
  createdBy: ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId })
  updatedBy: ObjectId;

  @ApiProperty()
  @Prop()
  staff: ObjectId[];

  @ApiProperty()
  @Prop()
  clients: ObjectId[];

  @ApiProperty()
  @Prop()
  features: string[];

  @ApiProperty()
  @Prop(
    raw({
      statusCode: Number,
      statusName: String,
    })
  )
  status: {
    statusCode: number;
    statusName: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED" | "COMPLETED";
  };

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
  payment: {
    paymentProcessedOn: string; // Date when the payment was processed
    paymentMethodId: string; // Stripe payment method ID
    amount: number; // Payment amount
    currency: string; // Payment currency (e.g., "USD", "EUR", "GBP")
    description: string; // Payment description or purpose
    statementDescriptor: string; // Statement descriptor for the payment (appears on the customer's credit card statement)
    metadata: { [key: string]: string }; // Metadata associated with the payment (optional)
    // Additional Stripe-specific properties as needed
  };

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
