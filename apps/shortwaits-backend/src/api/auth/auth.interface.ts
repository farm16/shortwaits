import { ApiProperty } from '@nestjs/swagger';
import { AuthPayloadType } from '@shortwaits/shared-types';
import { User } from '../users/entities/user.entity';

export class AuthSuccessResponse implements AuthPayloadType {
  @ApiProperty()
  auth: {
    readonly token: string;
    readonly refreshToken: string;
  };
  @ApiProperty()
  data: User & {
    readonly _id: any;
  };
}
