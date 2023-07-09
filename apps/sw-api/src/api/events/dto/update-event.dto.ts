import { PartialType } from "@nestjs/swagger";
import { CreateEventsDto } from "./create-event.dto";

export class UpdateEventsDto extends PartialType(CreateEventsDto) {}
