import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ORMConfig from './orm.config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { RatingModule } from './rating/rating.module';
import { CommentModule } from './comment/comment.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RatingModule,
    CommentModule,
    QuestionModule,
    TypeOrmModule.forRoot(ORMConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
