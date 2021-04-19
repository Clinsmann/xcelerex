import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base-entity';
import { QuestionEntity } from 'src/question/entities/question.entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  questionId: string;

  @Column()
  comment: string;

  @ManyToOne(() => QuestionEntity, question => question.comments)
  question: QuestionEntity;
}
