import { ApiProperty, OmitType } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';

export class ValidateUserEntity extends OmitType(LoginDto, ['password']) {
  @ApiProperty({
    default: 1,
  })
  userId: number;
}
