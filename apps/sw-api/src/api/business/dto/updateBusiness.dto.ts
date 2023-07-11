import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";

export class UpdateBusinessDto {
  @Trim()
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  country: string;

  @Trim()
  @MaxLength(64)
  @ApiProperty()
  phone1: string;

  @Trim()
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  longName: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty()
  shortName: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(164)
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isRegistrationCompleted: boolean;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  staff: [];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  categories: [];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  services: [];
}
