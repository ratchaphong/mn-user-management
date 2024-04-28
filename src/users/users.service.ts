import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      email: 'john@gmail.com',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      email: 'maria@gmail.com',
    },
  ];

  async findOne(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    // const user = await this.userRepository.findOne({ where: { email: email } });
    console.log(email);
    return this.users.find((user) => user.email === email);
  }

  async resetPassword({
    email,
    userId,
    password,
  }: {
    email: string;
    userId: number;
    password: string;
  }): Promise<{ message: string }> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // await this.userRepository.save({
    //   ...user,
    //   password: hashedPassword,
    // });

    return { message: 'Password send to email' };
  }

  // async changePassword(
  //   id: number,
  //   changePasswordDto: ChangePasswordDto,
  // ): Promise<void> {
  //   const user = await this.findById(id);

  //   const pwMatch = await bcrypt.compare(
  //     changePasswordDto.currentPassword,
  //     user.password,
  //   );

  //   if (!pwMatch) {
  //     throw new Error('Incorrect password');
  //   }

  //   user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
  //   await this.userRepository.save(user);
  // }

  async deleteUser(id: number) {
    const user = this.users.find((user) => user.userId === id);
    if (!user) throw new NotFoundException('User not found');
    // user.isActive = false;
    // await this.userRepository.save(user);
  }

  async activateUser(email: string) {
    // return this.userRepository.update(
    //   { email },
    //   {
    //     isActive: true,
    //   },
    // );
  }
}
