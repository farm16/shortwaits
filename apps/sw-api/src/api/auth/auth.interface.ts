import { ApiProperty } from "@nestjs/swagger";
import { AuthPayloadType, BusinessDtoType, BusinessUserDtoType } from "@shortwaits/shared-utils";

export class AuthSuccessResponse implements AuthPayloadType {
  @ApiProperty()
  auth: {
    readonly token: string;
    readonly refreshToken: string;
  };
  @ApiProperty()
  readonly attributes: {
    readonly currentBusinessAccounts: BusinessDtoType[];
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
