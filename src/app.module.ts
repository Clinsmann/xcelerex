import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ORMConfig from './orm.config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ReviewModule,
    TypeOrmModule.forRoot(ORMConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }