import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Auth, User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
