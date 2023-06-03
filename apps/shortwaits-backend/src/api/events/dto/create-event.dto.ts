import { ApiProperty } from "@nestjs/swagger";
import { EventType, ObjectId } from "@shortwaits/shared-types";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { Types } from "mongoose";

class UrlDto {
  @IsString()
  type: string;

  @IsBoolean()
  isSupported: boolean;

  @IsString()
  name: string;

  @IsString()
  url: string;
}

export class CreateEventsDto implements EventType {
  @IsString()
  @IsIn([
    "CREDIT CARD",
    "DEBIT CARD",
    "BANK TRANSFER",
    "PAYPAL",
    "APPLE PAY",
    "GOOGLE PAY",
    "BITCOIN",
    "AMAZON PAY",
    "CASH",
    "ZELLE",
    "CASH APP",
  ])
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

  @IsArray()
  participantsIds: ObjectId[];

  @IsString()
  leadClientId: ObjectId;

  @ValidateNested({ each: true })
  @Type(() => UrlDto)
  urls: UrlDto[];

  @IsString()
  location: string;

  @IsNumber()
  attendeeLimit: number;

  @IsDateString()
  registrationDeadline: Date;

  @IsNumber()
  registrationFee: number;

  @ApiProperty()
  @IsString()
  serviceId: ObjectId;

  @IsArray()
  @IsString({ each: true })
  staffIds: ObjectId[];

  @IsArray()
  @IsString({ each: true })
  clientsIds: ObjectId[];

  @IsBoolean()
  hasNoDuration: boolean;

  @IsString()
  leadClientName: string;

  @IsString()
  eventImage: string;

  @ApiProperty()
  @IsString()
  businessId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  service: Types.ObjectId;

  @IsArray()
  @IsString({ each: true })
  staff: Types.ObjectId[];

  @IsArray()
  @IsString({ each: true })
  clients: Types.ObjectId[];

  @IsString()
  name: string;

  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  createdBy: Types.ObjectId;

  @ApiProperty()
  @IsString()
  updatedBy: Types.ObjectId;

  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiProperty()
  @IsNumber()
  status: {
    statusCode: number;
    statusName: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED" | "COMPLETED";
  };

  @ApiProperty()
  @IsNumber()
  durationInMin: number;

  @ApiProperty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsDateString()
  endTime: Date;

  @ApiProperty()
  @IsDateString()
  endTimeExpected: Date;

  @ApiProperty()
  @IsNumber()
  priceExpected: number;

  @ApiProperty()
  @IsNumber()
  priceFinal: number;

  @ApiProperty()
  @IsBoolean()
  canceled: boolean;

  @ApiProperty()
  @IsString()
  cancellationReason: string;

  @ApiProperty()
  @IsBoolean()
  isGroupEvent: boolean;

  @ApiProperty()
  @IsBoolean()
  repeat: boolean;

  @ApiProperty()
  @IsObject()
  payment: {
    paymentMethodId: string;
    amount: number;
    currency: string;
    description: string;
    statementDescriptor: string;
    metadata: { [key: string]: string };
  };

  @ApiProperty()
  @IsString()
  notes: string;

  @IsArray()
  @IsString({ each: true })
  labels: string[];

  @ApiProperty()
  @IsBoolean()
  deleted: boolean;
}
