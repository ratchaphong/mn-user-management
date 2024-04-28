import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserEntity } from './entities/validate-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<ValidateUserEntity | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username: string; userId: number }): Promise<string> {
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload);
  }

  async confirmEmail({
    email,
    token,
  }: {
    email: string;
    token: string;
  }): Promise<{ message: string }> {
    if (!token) {
      throw new BadRequestException('Bad confirmation token');
    }

    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.usersService.activateUser(email);

    return { message: 'Email confirmed successfully' };
  }
}
