import { v4 as uuidv4 } from 'uuid';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReasonPhrases } from 'http-status-codes';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingEntity } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) { }

  async create(createRatingDto: CreateRatingDto) {
    const question = await this.questionRepository.findOne(createRatingDto.questionId);
    if (!question) throw new NotFoundException("Question " + ReasonPhrases.NOT_FOUND);
    const rating = this.ratingRepository.create({ ...createRatingDto, id: uuidv4() });
    const createdRating = await this.ratingRepository.save(rating);
    return { createdRating };
  }

  findAll() {
    return `This action returns all rating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
