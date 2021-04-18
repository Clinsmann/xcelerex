import { StatusCodes } from 'http-status-codes';
import { Controller, Post, Body, UsePipes, Param, Get, HttpCode } from '@nestjs/common';

import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { tokenTypes } from '../utils/constants';
import { RegisterDTO } from './dto/register.dto';
import { TokenTypes } from 'src/utils/getTemplate';
import { SendTokenDTO } from './dto/sendToken.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ResetPasswordDTO } from './dto/resetPassword.dto';

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

  @Post('reset-password/:token')
  @HttpCode(StatusCodes.OK)
  @UsePipes(new ValidationPipe())
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO, @Param('token') token: string): Promise<any> {
    return await this.authService.resetPassword(resetPasswordDTO, token);
  }
}
