import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { LoginDTO } from './login.dto';
import { RegisterDTO } from './register.dto';
import { SendTokenDTO } from './sendToken.dto';
import { tokenTypes } from '../utils/constants';
import { TokenTypes } from '../utils/getTemplate';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    return { user, accessToken: await this.generateToken(user) };
  }

  async register(registerDTO: RegisterDTO) {
    const id = uuidv4();
    registerDTO.id = id;
    const token = await this.generateToken({ id, email: registerDTO.email });
    await this.userService.create(registerDTO, token);
    return { activationUri: `${process.env.BACKEND_HOST}:${process.env.PORT}/activate-account/${token}` };
  }

  async activateAccount(token: string): Promise<any> {
    const data = await this.verifyToken(token);
    if (!data) throw new BadRequestException('Confirmation Error');
    await this.userService.doActivateAccount(data.id);
    return { message: 'account activated' };
  }

  async sendToken({ email }: SendTokenDTO, type: TokenTypes): Promise<any> {
    const user = await this.userService.findByField('email', email, false);
    if (!user) throw new BadRequestException('Account does not exist');
    if (type === tokenTypes.ACCOUNT_ACTIVATION && user.isActivated)
      throw new BadRequestException('Account already active');
    if (type === tokenTypes.PASSWORD_RESET && !user.isActivated)
      throw new BadRequestException('Kindly activate account.');
    const token = await this.generateToken(
      { id: user.id, email, type },
      { expiresIn: process.env.UTILITY_JWT_EXPIRY }
    );
    return await this.userService.doSendToken(user, token, type);
  }

  private async verifyToken(token: string): Promise<any> {
    try {
      const data = await this.jwtService.verify(token);
      const tokenExists = await this.userService.findByField('token', token);
      if (tokenExists && data) return data;
      throw new UnauthorizedException('Invalid Token');
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async generateToken(payload: any, options?: SignOptions): Promise<string> {
    return await this.jwtService.signAsync(payload, options);
  }

  async validateUser(email: string): Promise<any> {
    return await this.userService.findByField('email', email);
  }
}
