import { ApiProperty } from "@nestjs/swagger";
import { EventType } from "@shortwaits/shared-types";
import { Types } from "mongoose";

export class CreateEventsDto implements EventType {
  @ApiProperty()
  service: Types.ObjectId;

  @ApiProperty()
  staff: Types.ObjectId[];

  @ApiProperty()
  clients: Types.ObjectId[];

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdBy: Types.ObjectId;

  @ApiProperty()
  updatedBy: Types.ObjectId;

  @ApiProperty()
  features: string[];

  @ApiProperty()
  status: { statusCode: number; statusName: "pending" | "success" | "failed" };

  @ApiProperty()
  durationInMin: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  endTimeExpected: Date;

  @ApiProperty()
  priceExpected: number;

  @ApiProperty()
  priceFinal: number;

  @ApiProperty()
  canceled: boolean;

  @ApiProperty()
  cancellationReason: string;

  @ApiProperty()
  isGroupEvent: boolean;

  @ApiProperty()
  repeat: boolean;

  @ApiProperty()
  payment: object;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  labels: string[];

  @ApiProperty()
  deleted: boolean;
}
