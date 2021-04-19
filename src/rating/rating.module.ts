import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { RatingEntity } from './entities/rating.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([RatingEntity]),
    TypeOrmModule.forFeature([QuestionEntity])
  ],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule { }
