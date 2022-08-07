import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdParams {
  @IsString()
  @ApiProperty()
  id: string;
}
