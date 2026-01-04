import { BadRequestException, Injectable } from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Login } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth) private authModel: typeof Auth,
    private jwtService: JwtService
  ) { }

  async login(login: Login) {
    const { email, password } = login
    const foundedUser = await this.authModel.findOne({ where: { email } })
    if (!foundedUser) throw new BadRequestException('User not found')

    const isMatch = await bcrypt.compare(password, foundedUser.dataValues.password);
    if (!isMatch) throw new BadRequestException('Password is incorrect')

    const payload = { sub: foundedUser.dataValues.user_id, email: foundedUser.dataValues.email, role: foundedUser.dataValues.role };
    const token = this.jwtService.sign(payload);

    return { 
      access_token: token
    };
  }
}
