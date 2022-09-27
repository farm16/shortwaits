export class UpdateUserDto {
  readonly userName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly lastLoginAt: Date | null;
  readonly dni: string;
  readonly email: string;
  readonly password: string;
  readonly state: string;
  readonly rolId: string;
  readonly isAdmin: string;
  readonly isSuperAdmin: string;
  readonly isBackground: string;
}
