import { ApiProperty } from "@nestjs/swagger";
import { BusinessAvailableCurrenciesType, CreateServiceDtoType, DtoFriendlyType, ServiceColorType, WeekHoursType } from "@shortwaits/shared-lib";
import { IsArray, IsBoolean, IsNumber, IsObject, IsString } from "class-validator";

export class CreateServiceDto implements CreateServiceDtoType {
  @IsString()
  @ApiProperty({ required: true })
  businessId: string;
  @IsString()
  @ApiProperty({ required: true })
  name: string;
  @IsString()
  @ApiProperty({ required: false })
  description: string;
  @IsObject()
  @ApiProperty({ required: false })
  hours: DtoFriendlyType<WeekHoursType>;
  @IsArray()
  @ApiProperty({ required: false })
  applicableCategories: string[];
  @IsArray()
  @ApiProperty({ required: false })
  staff: string[];
  @IsNumber()
  @ApiProperty({ required: false })
  durationInMin: number;
  @IsNumber()
  @ApiProperty({ required: false })
  price: number;
  @IsString()
  @ApiProperty({ required: false })
  currency: BusinessAvailableCurrenciesType;
  @IsBoolean()
  @ApiProperty({ required: false })
  isPrivate: boolean;
  @IsObject()
  @ApiProperty({ required: false })
  urls?: DtoFriendlyType<{ zoom?: string; other1?: string; other2?: string }>;
  @IsBoolean()
  @ApiProperty({ required: false })
  isVideoConference: boolean;
  @IsObject()
  @ApiProperty({ required: false })
  serviceColor: DtoFriendlyType<ServiceColorType>;
  @IsString()
  @ApiProperty({ required: false })
  imageUrl: string;
}
