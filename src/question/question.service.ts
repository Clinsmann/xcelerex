import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { ReasonPhrases } from 'http-status-codes';
import { QuestionEntity } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) { }

  async create(createQuestionDto: CreateQuestionDto, userId: string) {
    const question = this.questionRepository.create({ ...createQuestionDto, id: uuidv4(), userId });
    await this.questionRepository.save(question);
    return { question };
  }

  async findAll() {
    const [questions, total] = await this.questionRepository.findAndCount({ take: 20 });
    return { questions, total };
  }

  async findOne(id: string) {
    const question = await this.questionRepository.find({ id });
    return { question };
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto, userId: string) {
    const question: any = await this.questionRepository.findOne(id);
    if (!question) throw new NotFoundException(ReasonPhrases.NOT_FOUND);
    if (question.userId !== userId) throw new UnauthorizedException(ReasonPhrases.UNAUTHORIZED);
    const tempQuestion = this.questionRepository.create({ ...question, ...updateQuestionDto });
    return { question: await this.questionRepository.save(tempQuestion) };
  }

  async remove(id: string, userId: string) {
    let question = await this.questionRepository.findOne(id);
    if (!question) throw new NotFoundException(ReasonPhrases.NOT_FOUND);
    if (question.userId !== userId) throw new UnauthorizedException(ReasonPhrases.UNAUTHORIZED);
    question = await this.questionRepository.remove(question);
    return { question };
  }
}
