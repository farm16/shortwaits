import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpWithSocialDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(320)
  @ApiProperty({ example: "google" })
  readonly provider: string;

  // make email optional for now
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @ApiProperty({ example: "" })
  readonly authCode: string;
}
