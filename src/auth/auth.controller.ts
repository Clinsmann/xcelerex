import { StatusCodes } from 'http-status-codes';
import { Controller, Post, Body, UsePipes, Param, Get, HttpCode } from '@nestjs/common';

import { LoginDTO } from './login.dto';
import { RegisterDTO } from './register.dto';
import { AuthService } from './auth.service';
import { SendTokenDTO } from './sendToken.dto';
import { tokenTypes } from '../utils/constants';
import { TokenTypes } from 'src/utils/getTemplate';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @HttpCode(StatusCodes.OK)
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
  @HttpCode(StatusCodes.OK)
  @UsePipes(new ValidationPipe())
  async resendActivationToken(@Body() resendTokenDTO: SendTokenDTO): Promise<any> {
    return await this.authService.sendToken(resendTokenDTO, tokenTypes.ACCOUNT_ACTIVATION as TokenTypes);
  }

  @Post('forgot-password')
  @HttpCode(StatusCodes.OK)
  @UsePipes(new ValidationPipe())
  async forgotPassword(@Body() forgotPasswordDTO: SendTokenDTO): Promise<any> {
    return await this.authService.sendToken(forgotPasswordDTO, tokenTypes.PASSWORD_RESET as TokenTypes);
  }
}
