import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class ResetPasswordDto extends LoginDto {
  @ApiProperty({
    default: 'john@gmail.com',
  })
  email: string;

  // @ApiProperty({
  //   default: 'master',
  // })
  // confirmPassword: string;
}
