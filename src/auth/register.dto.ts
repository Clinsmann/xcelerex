import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsUUID,
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
  @MinLength(2)
  @MaxLength(50)
  readonly country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly role: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  readonly jobTitle: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly institution: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsString()
  @IsOptional()
  profileImage: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly agreeToTerms: boolean;

  @IsBoolean()
  @IsOptional()
  readonly getUpdates: boolean;
}
