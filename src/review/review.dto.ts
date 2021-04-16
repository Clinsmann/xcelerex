import { IsNotEmpty, IsOptional, IsUUID, Min, Max, IsNumber } from 'class-validator';

export class ReviewDTO {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly wpId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;
}
