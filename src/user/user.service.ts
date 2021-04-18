import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { LoginDTO } from '../auth/login.dto';
import { tokenTypes } from 'src/utils/constants';
import { TokenTypes } from '../utils/getTemplate';
import { RegisterDTO } from '../auth/register.dto';
import { UpdateProfileDTO } from './updateProfile.dto';
import { ResetPasswordDTO } from './resetPassword.dto';
import { ChangePasswordDTO } from './changePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
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

  async resetPassword({ email, newPassword }: ResetPasswordDTO, token: string) {
    const user = await this.userRepository.findOne({ email: email.toLowerCase() });
    const decodedToken = await this.jwtService.verifyAsync(token);
    if (!user) throw new BadRequestException('Account does not exist');
    if (token !== user.token) throw new BadRequestException('Invalid token');
    if (decodedToken.email != user.email)
      throw new BadRequestException('Invalid credentials');
    const password = await bcrypt.hash(newPassword, 12);
    return this.sanitizeUser(
      await this.userRepository.save({ ...user, password, token: '' })
    );
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
