import { Injectable, UnauthorizedException } from "@nestjs/common"
import { Auth } from "./entities/auth.entity"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/sequelize"
import { LoginDto } from "./dto/create-auth.dto"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth) private authModel: typeof Auth,
    private jwtService: JwtService,
  ) { }

  generateAccessToken(auth: Auth) {
    return this.jwtService.sign({ sub: auth.userId, role: auth.role }, { expiresIn: "15m" })
  }

  async generateRefreshToken(auth: Auth) {
    const refreshToken = this.jwtService.sign(
      { sub: auth.userId, role: auth.role },
      { expiresIn: "7d" }
    )
    const hashed = await bcrypt.hash(refreshToken, 10)
    await this.authModel.update({ refreshToken: hashed }, { where: { id: auth.id } });
    return refreshToken
  }

  async login(login: LoginDto) {
    console.log(login);

    const auth = await this.authModel.findOne({ where: { email: login.email } })
    if (!auth) throw new UnauthorizedException("Invalid credentials")
    console.log(auth);


    const valid = await bcrypt.compare(login.password, auth.dataValues.password)
    if (!valid) throw new UnauthorizedException("Invalid credentials")
    console.log(valid);


    const accessToken = this.generateAccessToken(auth.dataValues)
    const refreshToken = await this.generateRefreshToken(auth.dataValues)
    console.log(accessToken, refreshToken);


    return { accessToken, refreshToken }
  }

  async refreshToken(oldToken: string) {
    const payload = this.jwtService.verify(oldToken, { secret: process.env.JWT_REFRESH_SECRET })
    const auth = await this.authModel.findOne({ where: { userId: payload.sub } })
    if (!auth) throw new UnauthorizedException()

    const valid = await bcrypt.compare(oldToken, auth.refreshToken)
    if (!valid) throw new UnauthorizedException()

    const newAccessToken = this.generateAccessToken(auth.dataValues)
    const newRefreshToken = await this.generateRefreshToken(auth.dataValues)

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  async logout(userId: number) {
    const auth = await this.authModel.findOne({ where: { userId } })
    if (auth) {
      auth.dataValues.refreshToken = ''
      await auth.save()
    }
    return { message: "Logged out" }
  }
}
