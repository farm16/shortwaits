import { ApiProperty } from "@nestjs/swagger";
import {
  AuthPayloadType,
  BusinessDocType,
  UserDocType,
} from "@shortwaits/shared-types";

export class AuthSuccessResponse implements AuthPayloadType {
  @ApiProperty()
  auth: {
    readonly token: string;
    readonly refreshToken: string;
  };
  @ApiProperty()
  readonly attributes: {
    readonly currentBusinessAccounts: BusinessDocType[];
    readonly currentUser: UserDocType;
  };
}

export class AuthRefreshSuccessResponse implements AuthPayloadType {
  @ApiProperty()
  auth: {
    readonly token: string;
    readonly refreshToken: string;
  };
}
