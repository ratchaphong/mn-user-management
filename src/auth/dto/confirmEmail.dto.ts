import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailDto {
  @ApiProperty({
    default: 'john@gmail.com',
  })
  email: string;

  @ApiProperty({
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTcxNDMwMDI2OSwiZXhwIjoxNzE0Mzg2NjY5fQ.LJZ7YtMNLvcYGPvb1Xz-b5zDaApqigJ_5V4Xs5utOMI',
  })
  token: string;
}
