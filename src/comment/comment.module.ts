import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([CommentEntity]),
    TypeOrmModule.forFeature([QuestionEntity])
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule { }
