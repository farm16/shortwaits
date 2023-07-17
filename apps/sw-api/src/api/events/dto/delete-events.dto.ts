import { IsArray } from "class-validator";

export class DeleteEventsDto {
  @IsArray()
  eventIds: string[];
}
