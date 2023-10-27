import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ClientSignUpWithEmailDto {
  @Trim()
  @IsString()
  @MaxLength(320)
  @IsEmail()
  @ApiProperty({ example: "sw@sw.com" })
  readonly email: string;

  @Trim()
  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  @ApiProperty({ example: "Shortwaits123" })
  readonly password: string;
}

export class ClientSignInWithEmailDto {
  @Trim()
  @IsString()
  @MaxLength(320)
  @IsEmail()
  @ApiProperty({ example: "sw@sw.com" })
  readonly email: string;

  @Trim()
  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  @ApiProperty({ example: "Shortwaits123" })
  readonly password: string;
}
