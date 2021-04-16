import { Controller, Get, UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { SentryInterceptor } from './sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): { name: string } {
    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): { message: string } {
    return this.appService.getHealth();
  }

  @Get('/debug-sentry')
  getDebugSentry(): { name: string } {
    throw new InternalServerErrorException();
    return this.appService.getHello();
  }
}
