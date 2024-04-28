import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/jwt.decorator';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ResetPasswordDto } from 'src/auth/dto/resetPassword.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  getHello() {
    return 'Hello World';
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @Post('/reset-password')
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(
    @Request() req,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    const { email, password } = resetPasswordDto;
    console.log(resetPasswordDto);
    console.log(req.user);
    return this.usersService.resetPassword({
      userId: req.user.userId,
      email,
      password,
    });
  }

  // @UseGuards(RoleGuard(Role.User))
  // @Patch('/change-password/:id')
  // async changePassword(
  //   @Param('id') id,
  //   @Body() changePasswordDto: ChangePasswordDto,
  // ) {
  //   return this.usersService.changePassword(id, changePasswordDto);
  // }

  @ApiBearerAuth()
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
