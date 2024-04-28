import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    default: 'john',
  })
  username: string;

  @ApiProperty({
    default: 'changeme',
  })
  password: string;
}
