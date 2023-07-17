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
  @ApiProperty({ example: "sw123" })
  readonly username: string;

  @Trim()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: "sw@sw.com" })
  readonly email: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: "Shortwaits123" })
  readonly password: string;
}
