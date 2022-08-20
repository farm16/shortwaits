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
import { BusinessEndpointsTypes } from "@shortwaits/shared-types";

type DTO = BusinessEndpointsTypes["business/"]["methods"]["POST"]["body"];
export class CreateBusinessDto implements DTO {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty()
  readonly country: string;

  @Trim()
  @IsPhoneNumber()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty()
  readonly phone1: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty()
  readonly shortName: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty()
  readonly longName: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(164)
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly isRegistrationCompleted: boolean;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly staff: [];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categories: [];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly services: [];
}
