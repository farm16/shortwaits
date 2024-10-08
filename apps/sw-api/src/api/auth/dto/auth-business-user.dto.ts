import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SignInWithEmailDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(320)
  @ApiProperty({ example: "sw123" })
  readonly username: string;

  // make email optional for now
  @Trim()
  @IsString()
  @IsOptional()
  @MaxLength(320)
  @ApiProperty({ example: "sw@sw.com" })
  readonly email: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: "Shortwaits123" })
  readonly password: string;
}

export class SignUpWithEmailDto {
  @Trim()
  @IsString()
  @IsOptional()
  @MaxLength(320)
  @ApiProperty({ example: "sw123" })
  readonly username: string;

  // make email optional for now
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(320)
  @ApiProperty({ example: "sw@sw.com" })
  readonly email: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(320)
  @ApiProperty({ example: "Shortwaits123" })
  readonly password: string;
}

export class WithSocialAuthDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(320)
  @ApiProperty({ example: "google" })
  readonly kind: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(400)
  @ApiProperty({ example: "1234567890" })
  readonly uid: string;

  // make email optional for now
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @ApiProperty({ example: "" })
  readonly authCode: string;
}
