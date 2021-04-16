import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(50)
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  readonly currentPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  readonly newPassword: string;
}
