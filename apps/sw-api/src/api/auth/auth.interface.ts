import { ApiProperty } from "@nestjs/swagger";
import { AuthPayloadType, BusinessDocType, BusinessUserDtoType } from "@shortwaits/shared-lib";

export class AuthSuccessResponse implements AuthPayloadType {
  @ApiProperty()
  auth: {
    readonly token: string;
    readonly refreshToken: string;
  };
  @ApiProperty()
  readonly attributes: {
    readonly currentBusinessAccounts: BusinessDocType[];
    readonly currentUser: BusinessUserDtoType;
  };
}

export class AuthRefreshSuccessResponse implements AuthPayloadType {
  @ApiProperty()
  auth: {
    readonly token: string;
    readonly refreshToken: string;
  };
}
