import { ApiProperty } from "@nestjs/swagger";
import { AddLocalClientDtoType, SocialAccountType } from "@shortwaits/shared-lib";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateLocalClientUserDto implements AddLocalClientDtoType {
  @ApiProperty()
  @IsNotEmpty()
  shortId: string;

  @ApiProperty()
  @IsNotEmpty()
  isSocialAccount: boolean;

  @ApiProperty()
  @IsNotEmpty()
  socialAccount: SocialAccountType;

  @ApiProperty()
  @IsNotEmpty()
  deviceSettings: {
    deviceUuid: string;
    hasExportedContacts: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isTwoFactorEnabled: boolean;
    isTwoFactorVerified: boolean;
    isTouchIdEnabled: boolean;
    isTouchIdVerified: boolean;
    isFaceIdEnabled: boolean;
    isFaceIdVerified: boolean;
    isPasswordlessEnabled: boolean;
  }[];

  @ApiProperty()
  @IsNotEmpty()
  accountSettings: {
    isDarkModeEnabled: boolean;
    isNotificationsEnabled: boolean;
    isLocationEnabled: boolean;
    isLocationShared: boolean;
    isLocationSharedWithBusinesses: boolean;
  };

  @ApiProperty()
  @IsNotEmpty()
  clientType: "local";

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
  };

  @ApiProperty()
  @IsOptional()
  desiredCurrencies: string[];
}
