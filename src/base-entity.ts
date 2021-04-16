import { v4 as uuidv4 } from 'uuid';
import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn({ type: 'uuid', default: uuidv4() })
  id?: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: string;
}
