import { IsNotEmpty, IsString, MaxLength, MinLength, IsUUID, IsOptional } from "class-validator";

export class CreateCommentDto {
  @IsUUID()
  @IsOptional()
  readonly userId?: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  readonly questionId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(1024)
  readonly comment: string;
}
