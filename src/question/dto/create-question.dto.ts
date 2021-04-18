import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateQuestionDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(2)
	@MaxLength(255)
	readonly title: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(2)
	@MaxLength(1024)
	readonly question: string;
}
