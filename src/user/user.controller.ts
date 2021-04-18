import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { StatusCodes } from 'http-status-codes';
import {
  Get,
  Put,
  Req,
  Post,
  Body,
  Delete,
  HttpCode,
  UsePipes,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateProfileDTO } from './dto/updateProfile.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) { }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Req() req: Request | any) {
    return { user: req.user.id };
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
  @HttpCode(StatusCodes.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateProfile(
    @Body() updateProfileDTO: UpdateProfileDTO,
    @Req() req: Request | any
  ): Promise<any> {
    if (updateProfileDTO.id !== req.user.id) throw new UnauthorizedException();
    return await this.userService.updateProfile(updateProfileDTO);
  }

  @Delete('user')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('jwt'))
  async deleteProfile(@Req() req: Request | any): Promise<any> {
    return await this.userService.deleteProfile(req.user.id);
  }
}
