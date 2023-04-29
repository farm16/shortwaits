import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class SignInWithEmailDto {
  @Trim()
  @IsString()
  @MaxLength(32)
  @IsOptional()
  @ApiProperty({ example: "shortwaits123" })
  readonly username: string;

  @Trim()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: "shortwaits123@123.com" })
  readonly email: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: "Shortwaits123" })
  readonly password: string;
}
