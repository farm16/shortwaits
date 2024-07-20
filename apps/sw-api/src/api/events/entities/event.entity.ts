import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BusinessLabelsType, DiscountType, EventPaymentMethodType, EventType, EventUrlsType, ObjectId } from "@shortwaits/shared-lib";
import { IsNumber, IsString } from "class-validator";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

class EventUrls implements EventUrlsType {
  type: string;
  isSupported: boolean;
  name: string;
  url: string;
}

class LocationDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsString()
  address2?: string; // Full address of the location
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  country: string;
  @IsString()
  postalCode: string;
  @IsNumber()
  latitude: number; // Latitude of the location
  @IsNumber()
  longitude: number; // Longitude of the location
}

class Discount implements DiscountType {
  code: string;
  discount: number;
  description: string;
  params?: {
    minPrice: number;
    maxPrice: number;
    minDuration: number;
    maxDuration: number;
    minParticipants: number;
    maxParticipants: number;
    minRegistrationFee: number;
    maxRegistrationFee: number;
    minAttendeeLimit: number;
    maxAttendeeLimit: number;
    minDiscount: number;
    maxDiscount: number;
  };
}

@Schema({ collection: "event" })
export class Event extends Document implements EventType {
  @ApiProperty()
  @Prop()
  shortId: string;

  @ApiProperty()
  @Prop()
  selectedDiscountCode: Discount;

  @ApiProperty()
  @Prop({ type: Array })
  availableDiscountCodes: Discount[];

  @ApiProperty()
  @Prop()
  discountAmount: number;

  @ApiProperty()
  @Prop()
  expectedEndTime: Date;

  @ApiProperty()
  @Prop()
  registrationDeadlineTime: string;

  @ApiProperty()
  @Prop({ type: Array })
  paymentMethod: EventPaymentMethodType;

  @ApiProperty()
  @Prop({ type: Types.ObjectId })
  leadClientId: ObjectId;

  @ApiProperty()
  @Prop()
  urls: EventUrls[];

  @ApiProperty()
  @Prop()
  location: LocationDto | null;

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
  participantsIds?: ObjectId[];

  @ApiProperty()
  @Prop()
  staffIds?: ObjectId[];

  @ApiProperty()
  @Prop()
  localClientsIds?: ObjectId[];

  @ApiProperty()
  @Prop()
  clientsIds?: ObjectId[];

  @ApiProperty()
  @Prop()
  hasDuration: boolean;

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
  clients: ObjectId[];

  @ApiProperty()
  @Prop()
  features: string[];

  @ApiProperty()
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  status: {
    statusCode: 0 | 1 | 2 | 3 | 4;
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
  endTimeExpected: string;

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
  isPublicEvent: boolean;

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
  @Prop(
    raw({
      type: MongooseSchema.Types.Mixed,
    })
  )
  labels: BusinessLabelsType;

  @ApiProperty()
  @Prop({ default: false })
  deleted: boolean;

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.Date, default: Date.now })
  createdAt: Date;

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.Date, default: Date.now })
  updatedAt: Date;
}

export const EventsSchema = SchemaFactory.createForClass(Event);

EventsSchema.pre<Event>("save", function (next) {
  this.updatedAt = new Date();
  next();
});
