import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('reviews')
export class ReviewEntity extends BaseEntity {

  @Column()
  wpId: number;

  @Column()
  userId: string;

  @Column()
  rating: number;
}
