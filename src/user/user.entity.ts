import * as bcrypt from 'bcrypt';
import { Entity, Column, BeforeInsert } from 'typeorm';

import { BaseEntity } from '../base-entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  country: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  jobTitle: string;

  @Column({ nullable: true })
  institution: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ type: 'boolean' })
  agreeToTerms: boolean;

  @Column({ type: 'boolean', nullable: true })
  getUpdates: boolean;

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
