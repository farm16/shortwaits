import { IsArray, IsBoolean, IsNotEmpty, IsString, MaxLength, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";

export class RegisterBusinessDto {
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
  @ApiProperty()
  services: [];

  //   @IsOptional()
  //   country: string;

  //   @IsOptional()
  //   phone1: string;

  //   @IsOptional()
  //   longName: string;
}
