import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { LoginDTO } from '../auth/dto/login.dto';
import { tokenTypes } from 'src/utils/constants';
import { TokenTypes } from '../utils/getTemplate';
import { UserEntity } from './entities/user.entity';
import { RegisterDTO } from '../auth/dto/register.dto';
import { UpdateProfileDTO } from './dto/updateProfile.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(registerDTO: RegisterDTO, token: string) {
    const { email } = registerDTO;
    const existingUser = await this.findByField('email', email.toLowerCase());
    if (existingUser) throw new BadRequestException('User already exists');
    const newUser = this.userRepository.create({ ...registerDTO, token, email: email.toLowerCase() });
    return this.sanitizeUser(await this.userRepository.save(newUser));
  }

  async findByLogin(userDTO: LoginDTO) {
    const user = await this.userRepository.findOne({ email: userDTO.email.toLowerCase() });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.isActivated)
      throw new UnauthorizedException('Account not activated');
    const passwordMatch = await bcrypt.compare(userDTO.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');
    return this.sanitizeUser(user);
  }

  async doActivateAccount(id: string) {
    const user = await this.userRepository.findOne({ id });
    const updatedUser = await this.userRepository.save({ ...user, token: '', isActivated: true });
    return this.sanitizeUser(updatedUser);
  }

  async doSendToken(user: UserEntity, token: string, type: TokenTypes) {
    let path: string;
    await this.userRepository.save({ ...user, token });
    if (type === tokenTypes.PASSWORD_RESET) path = "reset-password";
    if (type === tokenTypes.ACCOUNT_ACTIVATION) path = "activate-account";
    console.log({ type, path });
    return { uri: `${process.env.BACKEND_HOST}:${process.env.PORT}/${path}/${token}` };
  }

  async changePassword({ email, newPassword, currentPassword }: ChangePasswordDTO) {
    const user = await this.userRepository.findOne({ email: email.toLowerCase() });
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');
    const tempUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(newPassword, 12),
    });
    return this.sanitizeUser(await this.userRepository.save(tempUser));
  }

  async updateProfile(updateProfileDTO: UpdateProfileDTO) {
    return this.sanitizeUser(await this.userRepository.save({ ...updateProfileDTO }));
  }

  async findByField(field: string, value: string, doSanitized: boolean = true): Promise<any> {
    const user = await this.userRepository.findOne({ [field]: value });
    if (user) return !doSanitized ? user : this.sanitizeUser(user);
    return null;
  }

  async sanitizeUser({ password, token, ...sanitized }: UserEntity) {
    return sanitized;
  }

  async deleteProfile(id: string) {
    await this.userRepository.delete({ id });
    return { message: "account deleted." };
  }
}
