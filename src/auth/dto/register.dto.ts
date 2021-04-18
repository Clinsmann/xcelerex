import {
  IsUUID,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class RegisterDTO {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(50)
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}
