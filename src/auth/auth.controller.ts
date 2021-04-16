import { Controller, Post, Body, UsePipes, Param, Get } from '@nestjs/common';

import { LoginDTO } from './login.dto';
import { RegisterDTO } from './register.dto';
import { SendTokenDTO } from './sendToken.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() login: LoginDTO): Promise<any> {
    return await this.authService.login(login);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDTO: RegisterDTO): Promise<any> {
    return await this.authService.register(registerDTO);
  }

  @Get('activate-account/:token')
  async activateAccount(@Param('token') token: string): Promise<any> {
    return await this.authService.activateAccount(token);
  }

  @Post('resend-activation-token')
  @UsePipes(new ValidationPipe())
  async resendActivationToken(
    @Body() resendTokenDTO: SendTokenDTO
  ): Promise<any> {
    return await this.authService.sendToken(
      resendTokenDTO,
      'ACCOUNT_ACTIVATION'
    );
  }

  @Post('forgot-password')
  @UsePipes(new ValidationPipe())
  async forgotPassword(@Body() forgotPasswordDTO: SendTokenDTO): Promise<any> {
    return await this.authService.sendToken(
      forgotPasswordDTO,
      'PASSWORD_RESET'
    );
  }
}
