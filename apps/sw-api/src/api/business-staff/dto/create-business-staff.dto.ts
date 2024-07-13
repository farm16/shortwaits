import { ApiProperty } from "@nestjs/swagger";
import { Alias, CreateBusinessUserDtoType, DtoFriendlyType, UserAccountSettings, UserDeviceSettings, WeekHoursType } from "@shortwaits/shared-lib";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBusinessUserDto implements CreateBusinessUserDtoType {
  @ApiProperty()
  @IsOptional()
  alias: Alias;

  @ApiProperty()
  @IsOptional()
  shortId: string;

  @ApiProperty()
  @IsOptional()
  isSocialAccount: boolean;

  @ApiProperty()
  @IsOptional()
  deviceSettings: UserDeviceSettings[];

  @ApiProperty()
  @IsOptional()
  accountSettings: DtoFriendlyType<UserAccountSettings>;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  isPasswordProtected: boolean;

  @ApiProperty()
  @IsNotEmpty()
  preferredAlias: "username" | "displayName";

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  hours: DtoFriendlyType<WeekHoursType>;

  @ApiProperty()
  @IsOptional()
  displayName: string;

  @ApiProperty()
  @IsOptional()
  familyName: string;

  @ApiProperty()
  @IsOptional()
  givenName: string;

  @ApiProperty()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @IsOptional()
  accountImageUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  primaryPhoneNumberLabel: string;

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
    postCode: string;
    country: string;
  }[];

  @ApiProperty()
  @IsOptional()
  socialAccounts: { kind: string; uid?: string; username?: string }[];

  @ApiProperty()
  @IsOptional()
  birthday: string;

  @ApiProperty()
  @IsOptional()
  desiredCurrencies: string[];

  @ApiProperty()
  @IsOptional()
  locale: DtoFriendlyType<{ countryCode: string; isRTL: boolean; languageCode: string; languageTag: string }>;
}
