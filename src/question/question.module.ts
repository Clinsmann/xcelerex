import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionEntity } from './entities/question.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([QuestionEntity])
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule { }
