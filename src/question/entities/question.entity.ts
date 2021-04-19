import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '../../base-entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';

@Entity('questions')
export class QuestionEntity extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  question: string;

  @OneToMany(() => CommentEntity, comment => comment.question)
  comments: CommentEntity[];
}
