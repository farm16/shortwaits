import { ApiProperty } from "@nestjs/swagger";
import { CreateEventDtoType } from "@shortwaits/shared-types";
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

class LocationDto {
  @IsString()
  address: string; // Full address of the location
  @IsNumber()
  latitude: number; // Latitude of the location
  @IsNumber()
  longitude: number; // Longitude of the location
}

export class CreateEventsDto implements CreateEventDtoType {
  @IsString()
  @ApiProperty({ required: false })
  registrationDeadlineTime: Date;

  @IsString()
  @ApiProperty({ required: true })
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
  @ApiProperty({ required: true })
  participantsIds: Types.ObjectId[];

  @IsString()
  @ApiProperty({ required: false })
  leadClientId: string;

  @ValidateNested({ each: true })
  @Type(() => UrlDto)
  @ApiProperty({ required: false })
  urls: UrlDto[] | null;

  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  @ApiProperty({ required: false })
  location: LocationDto | null;

  @IsNumber()
  @ApiProperty({ required: false })
  attendeeLimit: number;

  @IsDateString()
  @ApiProperty({ required: false })
  registrationDeadline: Date;

  @IsNumber()
  @ApiProperty({ required: false })
  registrationFee: number;

  @ApiProperty()
  @ApiProperty({ required: true })
  serviceId: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ required: true })
  staffIds: string[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ required: true })
  clientsIds: string[];

  @IsBoolean()
  @ApiProperty({ required: false })
  hasNoDuration: boolean;

  @IsString()
  @ApiProperty({ required: false })
  eventImage: string;

  @ApiProperty()
  @ApiProperty({ required: true })
  businessId: string;

  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: false })
  @IsString({ each: true })
  features: string[];

  @ApiProperty({ required: false })
  @IsNumber()
  durationInMin: number;

  @ApiProperty({ required: true })
  @IsDateString()
  startTime: string;

  @ApiProperty({ required: false })
  @IsDateString()
  endTime: string;

  @ApiProperty({ required: false })
  @IsDateString()
  endTimeExpected: string;

  @ApiProperty({ required: true })
  @IsNumber()
  priceExpected: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  isGroupEvent: boolean;

  @IsBoolean()
  @ApiProperty({ required: false })
  repeat: boolean;

  @ApiProperty({ required: false })
  @IsObject()
  payment: {
    paymentMethodId: string;
    amount: number;
    currency: string;
    description: string;
    statementDescriptor: string;
    metadata: { [key: string]: string };
  };

  @ApiProperty({ required: false })
  @IsString()
  notes: string;

  @IsArray()
  @ApiProperty({ required: false })
  @IsString({ each: true })
  labels: string[];
}
