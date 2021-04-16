import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  getHello(): { name: string } {
    return { name: 'Hello from accelerex' };
  }

  getHealth(): { message: string } {
    return { message: 'APP IS UP AND RUNNING' };
  }
}
