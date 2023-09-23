import { ApiProperty } from "@nestjs/swagger";
import {
  BusinessLabelsType,
  CreateEventDtoType,
  EventPaymentMethodType,
  eventPaymentMethodsKeys,
} from "@shortwaits/shared-lib";
import { IsArray, IsBoolean, IsDateString, IsIn, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

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
  registrationDeadlineTime: string;

  @IsString()
  @ApiProperty({ required: true })
  expectedEndTime: string;

  @IsString()
  @ApiProperty({ required: true })
  @IsIn(eventPaymentMethodsKeys)
  paymentMethod: EventPaymentMethodType;

  @IsArray()
  @ApiProperty({ required: true })
  participantsIds: string[];

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
  registrationDeadline: string;

  @IsNumber()
  @ApiProperty({ required: false })
  registrationFee: number;

  @ApiProperty()
  @ApiProperty({ required: false })
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
  hasDuration: boolean;

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

  @ApiProperty({ required: true })
  @IsNumber()
  priceExpected: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  isPublicEvent: boolean;

  @IsBoolean()
  @ApiProperty({ required: false })
  repeat: boolean;

  @ApiProperty({ required: false })
  @IsObject()
  payment: {
    paymentProcessedOn: string; // Date when the payment was processed
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
  labels: BusinessLabelsType;
}
