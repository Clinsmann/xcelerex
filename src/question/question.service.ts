import { v4 as uuidv4 } from 'uuid';
import { getRepository, Repository } from 'typeorm';
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
    const [questions, total] = await this.questionRepository
      .findAndCount({ take: 20, relations: ['comments', 'ratings'] });
    return { questions, total };
  }

  async findOne(id: string) {
    let upVote = 0, downVote = 0;
    const res = await getRepository(QuestionEntity)
      .createQueryBuilder('questions')
      .where({ id })
      .leftJoinAndSelect("questions.comments", "comment")
      .leftJoinAndSelect("questions.ratings", "rating")
      .select([
        'questions.id',
        'questions.title',
        'questions.question',
        'comment.id',
        'comment.comment',
        'rating.id',
        'rating.rating'
      ])
      .getOne();

    res.ratings.forEach(({ rating }: any) => {
      if (!!rating) upVote++;
      if (!rating) downVote++;
    });

    const { ratings, comments, ...questionData }: any = res;
    return { question: questionData, comments, votes: { upVote, downVote } };
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
