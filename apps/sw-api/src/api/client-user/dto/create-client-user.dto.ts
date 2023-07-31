import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateClientUserDtoType } from "@shortwaits/shared-lib";

export class CreateClientUserDto implements CreateClientUserDtoType {
  @ApiProperty()
  @IsNotEmpty()
  clientType: "local" | "external";

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  alias: "username" | "displayName" | "familyName" | "givenName" | "middleName";

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
  password: string;

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
  phoneNumbers: {
    label: string;
    number: string;
  }[];

  @ApiProperty()
  @IsOptional()
  imAddresses: {
    username: string;
    service: string;
  }[];

  @ApiProperty()
  @IsOptional()
  addresses: {
    label: string;
    address1: string;
    address2: string;
    city: string;
    region: string;
    state: string;
    postCode: string;
    country: string;
  }[];
  @ApiProperty()
  @IsOptional()
  socialAccounts: {
    kind: string;
    uid?: string;
    username?: string;
  }[];

  @ApiProperty()
  @IsOptional()
  desiredCurrencies: string[];
}
