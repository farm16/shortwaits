import { IsArray, IsBoolean, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import {
  AccountType,
  BusinessDtoType,
  BusinessHoursType,
  BusinessLabelType,
  BusinessLocationType,
  CurrencyType,
  ObjectId,
  UpdateBusinessDtoType,
} from "@shortwaits/shared-lib";

export class UpdateBusinessDto implements UpdateBusinessDtoType {
  staff: string[];
  isDisabled: boolean;
  categories: string[];
  services: string[];
  events: string[];
  description: string;
  currency: CurrencyType;
  country: string;
  phone1: string;
  shortName: string;
  longName: string;
  hours: BusinessHoursType;
  location: BusinessLocationType;
  updatedBy: string;
  clients: string[];
  taggedClients: { clientId: ObjectId; services: ObjectId[]; tags: string[] }[];
  isWebBookingEnabled: boolean;
  isSmsNotificationEnabled: boolean;
  isAppNotificationEnabled: boolean;
  videoConference: { isActive: boolean; url: string }[];
  isVideoConferenceEnabled: boolean;
  supportEmail?: string;
  supportPhone?: string;
  deliveryInfo?: string;
  reservations?: string[];
  paymentMethods?: string[];
  web?: { isActive: boolean };
  email: string;
  labels: BusinessLabelType[];
}
// @Trim()
// @IsString()
// @MaxLength(64)
// @ApiProperty()
// country: string;

// @Trim()
// @MaxLength(64)
// @ApiProperty()
// phone1: string;

// @Trim()
// @IsString()
// @MaxLength(64)
// @ApiProperty()
// longName: string;

// @Trim()
// @IsString()
// @IsNotEmpty()
// @MaxLength(64)
// @ApiProperty()
// shortName: string;

// @Trim()
// @IsString()
// @IsNotEmpty()
// @MaxLength(164)
// @ApiProperty()
// description: string;

// @IsNotEmpty()
// @IsBoolean()
// @ApiProperty()
// isRegistrationCompleted: boolean;

// @IsArray()
// @IsNotEmpty()
// @ApiProperty()
// staff: [];

// @IsArray()
// @IsNotEmpty()
// @ApiProperty()
// categories: [];

// @IsArray()
// @IsNotEmpty()
// @ApiProperty()
// services: [];
