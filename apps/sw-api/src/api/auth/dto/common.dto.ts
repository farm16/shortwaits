import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class RequestResetPasswordDto {
  @ApiProperty({ example: "test@shortwaits.com" })
  @Trim()
  @IsString()
  @MaxLength(320)
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: "test@shortwaits.com" })
  @Trim()
  @IsString()
  @MaxLength(320)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Trim()
  @IsString()
  @MaxLength(600)
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(320)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
  })
  password: string;
}
