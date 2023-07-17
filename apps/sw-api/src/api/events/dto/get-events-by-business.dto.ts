import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsDateString, IsNumber, IsEnum } from "class-validator";

export class GetEventsByBusinessDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({ required: false, default: new Date().toISOString() })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({
    required: false,
    enum: ["day", "month", "year"],
    default: "year",
  })
  @IsOptional()
  @IsEnum(["day", "month", "year"])
  filterBy?: "day" | "month" | "year";
}
