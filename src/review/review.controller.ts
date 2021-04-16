
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { AuthGuard } from '@nestjs/passport';
import {
  Get,
  Req,
  Post,
  Body,
  Param,
  UsePipes,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { ValidationPipe } from '../shared/validation.pipe';
import { ReviewDTO } from './review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {

  constructor(private reviewService: ReviewService) { }

  @Get(':id')
  async getReview(@Req() req: Request | any, @Param('id') id: string) {
    const auhtHeader = req.headers.authorization;
    let token = auhtHeader ? auhtHeader.split(" ")[1] : null;
    token = token && jwt.verify(token, process.env.JWT_SECRET);
    return await this.reviewService.getReview(parseInt(id), token?.id || null);
  }

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async addReview(@Req() req: Request | any, @Body() reviewDTO: ReviewDTO): Promise<any> {
    return await this.reviewService.addReview({ ...reviewDTO, userId: req.user.id });
  }
}
