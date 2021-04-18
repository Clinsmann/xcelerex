import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(50)
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  readonly newPassword: string;
}
