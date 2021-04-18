import * as bcrypt from 'bcrypt';
import { Entity, Column, BeforeInsert } from 'typeorm';

import { BaseEntity } from '../base-entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: false })
  isActivated: boolean;

  @Column({ default: null, nullable: true })
  token: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  async hasPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
