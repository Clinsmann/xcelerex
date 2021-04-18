
import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

import { BaseEntity } from '../../base-entity';

@Entity('questions')
export class QuestionEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id?: string;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  question: string;
}
