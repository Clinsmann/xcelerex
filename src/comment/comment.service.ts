import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { ReasonPhrases } from 'http-status-codes';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CommentEntity } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { QuestionEntity } from 'src/question/entities/question.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    const question = await this.questionRepository.findOne(createCommentDto.questionId);
    if (!question) throw new NotFoundException("Question " + ReasonPhrases.NOT_FOUND);
    const comment = this.commentRepository.create({ ...createCommentDto, id: uuidv4() });
    const createdComment = await this.commentRepository.save(comment);
    return { createdComment };
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
