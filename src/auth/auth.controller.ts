import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from './jwt.decorator';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { ConfirmEmailDto } from './dto/confirmEmail.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req, @Body() loginDto: LoginDto) {
    console.log(loginDto);
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @Post('/confirm')
  @ApiBody({ type: ConfirmEmailDto })
  async confirmEmail(@Body() confirmDto: ConfirmEmailDto) {
    const { email, token } = confirmDto;
    return this.authService.confirmEmail({ email, token });
  }
}
