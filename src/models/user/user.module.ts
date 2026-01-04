import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from '../auth/entities/auth.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Auth, User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
