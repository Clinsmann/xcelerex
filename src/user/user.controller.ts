import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Get,
  Put,
  Req,
  Post,
  Body,
  Param,
  HttpCode,
  UsePipes,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateProfileDTO } from './updateProfile.dto';
import { ResetPasswordDTO } from './resetPassword.dto';
import { ChangePasswordDTO } from './changePassword.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import cloudinaryStorage from '../utils/cloudinaryStorage';

@Controller()
export class UserController {
  constructor(private userService: UserService) { }

  @Get('user/:id')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Req() req: Request | any, @Param('id') id: string) {
    if (id !== req.user.id) throw new UnauthorizedException();
    const user = await this.userService.findByField('id', req.user.id);
    if (!user.isActivated)
      throw new UnauthorizedException('Kindly Activate your account');
    return user;
  }

  @Post('change-password')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async changePassword(
    @Req() req: Request | any,
    @Body() changePasswordDTO: ChangePasswordDTO
  ): Promise<any> {
    if (changePasswordDTO.email !== req.user.email)
      throw new UnauthorizedException();
    return await this.userService.changePassword(changePasswordDTO);
  }

  @Put('user')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateProfile(
    @Body() updateProfileDTO: UpdateProfileDTO,
    @Req() req: Request | any
  ): Promise<any> {
    if (updateProfileDTO.id !== req.user.id) throw new UnauthorizedException();
    return await this.userService.updateProfile(updateProfileDTO);
  }

  @Post('reset-password/:token')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async resetPassword(
    @Body() resetPasswordDTO: ResetPasswordDTO,
    @Param('token') token: string
  ): Promise<any> {
    return await this.userService.resetPassword(resetPasswordDTO, token);
  }

  @Post('upload')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('avatar', { storage: cloudinaryStorage }))
  async upload(
    @UploadedFile() avatar: any,
    @Req() req: Request | any
  ): Promise<any> {
    return await this.userService.upload(avatar, req.user.id);
  }
}
