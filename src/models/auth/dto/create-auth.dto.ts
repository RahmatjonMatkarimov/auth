import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'rahmatjon@gmail.com',
    description: 'Foydalanuvchi email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Foydalanuvchi paroli (kamida 6 ta belgi)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
