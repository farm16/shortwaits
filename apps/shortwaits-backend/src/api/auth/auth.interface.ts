import { ApiProperty } from "@nestjs/swagger";
import {
  AuthPayloadType,
  BusinessPayloadType,
  UserPayloadType,
} from "@shortwaits/shared-types";

export class AuthSuccessResponse implements AuthPayloadType {
  @ApiProperty()
  auth: {
    readonly token: string;
    readonly refreshToken: string;
  };
  @ApiProperty()
  readonly attributes: {
    readonly currentBusinessAccounts: BusinessPayloadType[];
    readonly currentUser: UserPayloadType;
  };
}
