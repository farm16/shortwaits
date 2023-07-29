import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BusinessUserCreateDtoType } from "@shortwaits/shared-lib";

export class CreateBusinessUserDto implements BusinessUserCreateDtoType {
  @ApiProperty()
  @IsNotEmpty()
  birthday: { year: number; month: number; day: number };

  @ApiProperty()
  @IsNotEmpty()
  registrationState: { screenName: string; state: number; isCompleted: boolean };

  @ApiProperty()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty()
  @IsNotEmpty()
  clientType: "partial" | "full";

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  alias: "displayName" | "familyName" | "givenName" | "middleName";

  @ApiProperty()
  @IsNotEmpty()
  givenName: string;

  @ApiProperty()
  @IsNotEmpty()
  familyName: string;

  @ApiProperty()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty()
  @IsOptional()
  accountImageUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsOptional()
  locale: {
    countryCode: string;
    isRTL: boolean;
    languageCode: string;
    languageTag: string;
  };
  @ApiProperty()
  @IsOptional()
  phoneNumbers: { label: string; number: string }[];

  @ApiProperty()
  @IsOptional()
  imAddresses: { username: string; service: string }[];

  @ApiProperty()
  @IsOptional()
  addresses: {
    label: string;
    address1: string;
    address2: string;
    city: string;
    region: string;
    state: string;
    postCode: number;
    country: string;
  }[];
  @ApiProperty()
  @IsOptional()
  socialAccounts: { kind: string; uid?: string; username?: string; password?: string }[];

  @ApiProperty()
  @IsOptional()
  desiredCurrencies: string[];
}
