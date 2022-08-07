import { ApiProperty } from '@nestjs/swagger';
import { Business } from './entities/business.entity';

export class BusinessSuccessResponse {
  @ApiProperty()
  data: Business & {
    readonly _id: any;
  };
}
