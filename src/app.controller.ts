import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './auth/dto/login.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/jwt.decorator';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
}
