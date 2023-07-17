import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class SignUpWithEmailDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @ApiProperty({ example: "sw" })
  readonly username: string;

  @Trim()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: "sw@sw.com" })
  readonly email: string;

  @Trim()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ example: "Shortwaits123" })
  readonly password: string;
}
