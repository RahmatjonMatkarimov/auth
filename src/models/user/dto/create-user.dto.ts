import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Rahmatjon',
    description: 'Foydalanuvchi to‘liq ismi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'rahmatjon@gmail.com',
    description: 'Foydalanuvchi email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Parol (kamida 6 ta belgi)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
