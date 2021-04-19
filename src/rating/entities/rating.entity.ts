import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base-entity';
import { QuestionEntity } from 'src/question/entities/question.entity';

@Entity('ratings')
export class RatingEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  questionId: string;

  @Column()
  rating: boolean;

  @ManyToOne(() => QuestionEntity, question => question.ratings)
  question: QuestionEntity;
}
