import {
  Req,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  UseGuards,
  Controller,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: Request | any) {
    return this.questionService.create(createQuestionDto, req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Req() req: Request | any,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionService.update(id, updateQuestionDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Req() req: Request | any,) {
    return this.questionService.remove(id, req.user.id);
  }
}
