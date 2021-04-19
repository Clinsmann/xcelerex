import { IsNotEmpty, IsString, IsUUID, IsOptional, IsBoolean } from "class-validator";

export class CreateRatingDto {
  @IsUUID()
  @IsOptional()
  readonly userId?: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  readonly questionId: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly rating: boolean;
}

